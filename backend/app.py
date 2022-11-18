from flask import Flask, jsonify, request
import pymysql.cursors
import pandas as pd

# 실행
# flask --debug run

app = Flask(__name__)
if __name__ == "__main__":
    app.run(debug=True)

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
    # flask에 내장된 request 메소드로 요청의 쿼리스트링에 접근
    market = request.args.get('market', '')
    # code = request.args.get('code', '')

    # 요청받은 시장의 전체 종목코드 리스트를 조회
    cur = connection.cursor(pymysql.cursors.DictCursor)
    cur.execute(f'SELECT code FROM companylist WHERE market="{market}"')
    all_list = cur.fetchall()
    # print(all_list)

    
    #* 일단 거래량부터. 거래량은 가장 최근 한 개씩만 뽑아오면 됨
        # 반복문 앞에 `WITH temp_table AS (`
        # 반복되어야 하는 내용은 SELECT FROM절 + union all
            # 맨 마지막 반복에는 union all이 들어가면 안됨
        # 반복문 뒤에 `SELECT * FROM temp_table order by volume desc;`
    # executemany 메서드는 INSERT문에만 쓸 수 있는 게 아닌가 싶다

    # range(): 입력받은 숫자에 해당하는 범위의 값을 반복 가능한 객체로 만들어 리턴한다
    # len(): 리스트 안의 요소 개수를 리턴한다
    select=[]
    for i in range(len(all_list)):
        codeindex = all_list[i]["code"]
        select.append(f"SELECT * FROM {market}_{codeindex}_m UNION ALL")

    print(*select, sep=', ') #대괄호 제거하고 배열 출력

    temp = ('''
    WITH temp_table AS (
    {select}
    ) SELECT * FROM temp_table order by volume desc;
    '''.format(select=select))
    # print(temp)


    """ cur.execute ('''
    WITH temp_table AS (
    
    SELECT * FROM temp_table order by volume desc;'''
    .format(market=market, code=code)) """
    

    # connection.commit()
    # api = cur.fetchall()
    # df = pd.DataFrame(api)
    # print(df)
    # return jsonify(df)
    
    return "asdfasdfsaf"