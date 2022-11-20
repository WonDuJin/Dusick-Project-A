from flask import Flask, jsonify, request
import pymysql.cursors

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
    # *1. flask에 내장된 request 메소드를 사용해서 클라이언트로부터 받은 요청의 쿼리스트링에 접근
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
    for i in range(len(all_list)):
        code_index = all_list[i-1]["code"] # 뒤에서 두번째까지만 반복
        select.append(f"SELECT * FROM {market}_{code_index}_m UNION ALL")
    code_last = all_list[-1]["code"] # 맨 뒤에 있는 항목
    select.append(f"SELECT * FROM {market}_{code_last}_m")
    

    # *4. 배열 대괄호 제거하고 문자열로 출력
    # 1) unpack 방식은 print는 되는데 변수에 할당은 안됨.
        # print(*select, sep=', ')
        # remove_braket = f"*{select}, sep=', '"
    
    # 2) join 방식은 잘됨
        # remove_braket= ', '.join(select)

    # 3) str 방식도 잘됨. 이걸로 채택.
    remove_braket = str(select)[1:-1].replace("'", "").replace(",", "")
    # print(remove_braket)

    # *5. 최종적으로 쿼리문 조립해서 데이터베이스 서버에 요청
    query = ('''
    WITH temp_table AS (
    {remove_braket}
    ) SELECT * FROM temp_table order by volume desc LIMIT 28;
    '''.format(remove_braket=remove_braket))
    cursor.execute(query)
    connection.commit()

    # *6. 데이터베이스 서버에서 받아온 데이터를 클라이언트에게 응답
    api = cursor.fetchall()
    return jsonify(api)
