import pymysql

class dusickdb():
  def get_all():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)
        
    #SQL문으로 Companylist 전체 DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()   
    
    return dusick_lists 

  
  def get_api():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨    

    #SQL문으로 Companylist DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}"')
    dusick_lists = cur.fetchall()

    #조회한 DB에서 code, market, name을 변수로 지정, 반복문을 사용하여 변수에 code의 값을 저장

    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[0]["market"]
      markettype = market.upper()   
    
    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력
      cur.execute(f'SELECT open,high,low,close,volume FROM {markettype}_{code}_m LIMIT 10')
      api = cur.fetchall()

      #프린트에서는 찍히는 데 값이 출력이 되는데 브라우저에서는 출력이 안되는 현상 발생
      print(api)

    return api

  # def get_volume():
  #   conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
  #   cur = conn.cursor(pymysql.cursors.DictCursor)

  #   #SQL문으로 Companylist DB 조회"
    
  #   cur.execute(f'SELECT code,market,name FROM companylist')
  #   dusick_lists = cur.fetchall()
  #   #조회한 DB에서 code, market, name을 변수로 지정
  #   code = dusick_lists[0]["code"]
  #   market = dusick_lists[0]["market"]
  #   markettype = market.upper()
  #   name = dusick_lists[0]["name"]
  #   data = [[code],[market]]
  #   print(data)
    

  #   # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력
  #   cur.execute(f'SELECT open,high,low,close,volume FROM {markettype}_{code}_m ORDER BY volume DESC LIMIT 10')
  #   volume = cur.fetchall()

  #   return volume