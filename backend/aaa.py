from flask import Flask, jsonify
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

@app.route('/companylist',methods=['POST','GET'])
def get_api():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    market = "kosdak"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}"')
    dusick_lists = cur.fetchall()
    
    
    
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      print([code],[market])      
      # markettype = market.upper()
      
      cur.execute(f'ALTER TABLE {market}_{code}_m ADD code VARCHAR(15) DEFAULT "{code}"')
      conn.commit()
      api = cur.fetchall()
      df = pd.DataFrame(api)
      print(df)
    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력

    return jsonify()