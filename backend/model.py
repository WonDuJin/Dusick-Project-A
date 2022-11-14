import pymysql
from flask import Flask, jsonify, request

class dusickdb():
  def get_all():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)    

    data = []
    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()   
    # for i in range(len(dusick_lists)):
    #   code = dusick_lists[i]["code"]
    #   market = dusick_lists[0]["market"]
    #   print([code],[market])
      
    

    #SQL문으로 Companylist 전체 DB 조회"
    
    return dusick_lists

  def get_api():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨
    market="kosdak"
    

    #SQL문으로 Companylist DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}"')
    dusick_lists = cur.fetchall()

    #조회한 DB에서 code, market, name을 변수로 지정

    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[0]["market"]
      # print([code],[market])      
      markettype = market.upper()   
      cur.execute(f'SELECT open,high,low,close,volume FROM {markettype}_{code}_m LIMIT 10')
      api = cur.fetchall()
      print(api)
    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력

    return jsonify(api)

  def get_volume():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #SQL문으로 Companylist DB 조회"
    
    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()
    #조회한 DB에서 code, market, name을 변수로 지정
    code = dusick_lists[0]["code"]
    market = dusick_lists[0]["market"]
    markettype = market.upper()
    name = dusick_lists[0]["name"]
    data = [[code],[market]]
    print(data)
    

    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력
    cur.execute(f'SELECT open,high,low,close,volume FROM {markettype}_{code}_m ORDER BY volume DESC LIMIT 10')
    volume = cur.fetchall()

    return volume

# conn = None
# cur = None

# data1=""
# data2=""
# data3=""
# data4=""
# data5=""



# conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
# cur = conn.cursor()

# cur.execute('SELECT * FROM companylist')
# print("오픈  상승  하락  마감   거래량")
# print("===============================")

# while(True):
#   row = cur.fetchone()
#   if row == None:
#     break

#   data1=row[0]
#   data2=row[1]
#   data3=row[2]
#   data4=row[3]
#   data5=row[4]

#   print(data1,data2,data3,data4,data5)

# conn.close()