from flask import Flask, jsonify, request
import pymysql.cursors

# todo. 현재 파일: app_new
# 가상환경 활성화: backend\venv\Scripts\activate.bat
# 디버깅 모드 활성화: set FLASK_DEBUG=1
# 실행: flask run

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

connection = pymysql.connect(
  user='root',
  password='00000000',
  host='127.0.0.1',
  database='aitrading_db',
  charset='utf8',
)

@app.route('/')
def index():
    return "Index Page"

@app.route('/companylist')
# 실행 방법 => http://127.0.0.1:5000/companylist?market=kosdak
def companylist():
    # *1. flask에 내장된 request 객체에 접근해서 클라이언트로부터 받은 요청의 쿼리스트링을 가져옴
    market = request.args.get('market', '')
    # code = request.args.get('code', '')

    # *2. 해당 시장의 전체 종목코드 리스트를 데이터베이스 서버에 요청
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute(f'SELECT code FROM companylist WHERE market="{market}"')
    all_list = cursor.fetchall()
    # print(all_list)

    # *3. 종목코드 리스트를 SELECT문 형태로 가공
    # range(): 입력받은 숫자에 해당하는 범위의 값을 반복 가능한 객체로 만들어 리턴한다
    # len(): 리스트 안의 요소 개수를 리턴한다
    select=[] # 저장용 배열
    for i in range(len(all_list)-1):
        code_index = all_list[i]["code"] # 뒤에서 두번째까지만 반복
        select.append(f'SELECT * FROM {market}_{code_index}_m WHERE day="2022-02-03" UNION ALL')
    code_last = all_list[-1]["code"] # 맨 뒤에 있는 항목
    select.append(f'SELECT * FROM {market}_{code_last}_m WHERE day="2022-02-03"')

    query_or=[] # 저장용 배열
    for i in range(len(all_list)-1): # 뒤에서 두번째까지만 반복
        code_index = all_list[i]["code"]
        query_or.append(f'code={code_index} OR')
    code_last = all_list[-1]["code"] # 맨 뒤에 있는 항목
    query_or.append(f'code={code_index}')
    

    # *4. 배열 대괄호 제거하고 문자열로 출력
    # 1) unpack 방식은 print는 되는데 변수에 할당은 안됨.
        # print(*select, sep=', ')
        # remove_braket = f"*{select}, sep=', '"
    
    # 2) join 방식은 잘됨
        # remove_braket= ', '.join(select)

    # 3) str 방식도 잘됨. 이걸로 채택.
    def remove_braket(braket):
        return str(braket)[1:-1].replace("'", "").replace(",", "")

    return jsonify(remove_braket(query_or))

    # *5. 최종적으로 쿼리문 조립해서 데이터베이스 서버에 요청
    """ query = ('''
    WITH temp_table AS ({select}),
    temp_name AS (SELECT name, code FROM companylist WHERE {query_or})
    SELECT * FROM temp_table INNER JOIN temp_name ON temp_table.code = temp_name.code ORDER BY volume DESC LIMIT 28;
    '''.format(select=remove_braket(select), query_or=remove_braket(query_or))) """

    query = ('''
    WITH temp_name AS (SELECT name, code FROM companylist WHERE {query_or}) SELECT * FROM temp_table INNER JOIN temp_name ON temp_table.code = temp_name.code ORDER BY volume DESC LIMIT 28;
    '''.format(select=remove_braket(select), query_or=remove_braket(query_or)))

    return jsonify(query)

    """ cursor.execute(query)
    connection.commit()

    # *6. 데이터베이스 서버에서 받아온 데이터를 클라이언트에게 응답
    api = cursor.fetchall()
    return jsonify(api) """