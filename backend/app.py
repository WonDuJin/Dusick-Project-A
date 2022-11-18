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
def companylist():
    # * flask에 내장된 request 메소드로 요청의 쿼리스트링에 접근
    market = request.args.get('market', '')
    # code = request.args.get('code', '')

    # * 요청받은 시장의 전체 종목 리스트를 조회
    cur = connection.cursor(pymysql.cursors.DictCursor)
    cur.execute(f'SELECT code FROM companylist WHERE market="{market}"')
    all_list = cur.fetchall()
    print(all_list)
    
    # todo. 일단 거래량부터. 거래량은 가장 최근 한 개씩만 뽑아오면 됨
    # * WITH절로 임시 테이블을 만들고 SELECT FROM 종목코드를 UNION ALL로 넣어서 조회하는 종목코드를 동적으로 넣어야 됨
    for i in range(len(all_list)):
        code = all_list[i]["code"]
        cur.execute ('''
        SELECT * FROM {market}_{code}_m
        LIMIT 10;'''
        .format(market=market, code=code))


    """ connection.commit()
    api = cur.fetchall()
    df = pd.DataFrame(api)
    print(df)

  return jsonify(df) """