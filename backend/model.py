import pymysql.cursors
from flask import request
from dbconnection import db_connection

db = db_connection

class DataRoute():

  # 라우터에서 매개변수를 사용하여 URL 주소창에 kospi or kosdak을 치면 companly의 WHERE절 조건으로 해당 값이 입력된다.
  def markets(market):
    cur = db.cursor(pymysql.cursors.DictCursor)

    #company list에서 랜덤으로 코스피 or 코스닥의 28개 회사의 market, code name을 조회 
    cur.execute(f"SELECT market,code,name FROM CompanyList WHERE market = '{market}' ORDER BY RAND() LIMIT 28")
    res = cur.fetchall()
    data_stack = list() # 빈 배열 생성

    # SQL문을 반복문을 통하여 빈 배열에 값을 계속 추가 
    for i in range(len(res)):
      code = res[i]["code"]
      market = res[i]["market"]
      # companylist에서 조회한 값을 가지고 문자 리터럴을 통하여 값을 넣고 각회사의 정보 테이블과 companylist의 테이블을 INNER JOIN 시킨다.
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day,ROUND((high+low)/2,1) AS mid, ROUND((((high+low)/2)*0.04),2) AS medomesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      res2 = cur.fetchall()
      data_stack.append(res2)
    return data_stack
  
  # 프론트에서 리스트에 출력된 회사 이름을 클릭시 해당 회사의 이름 값을 전송받아 WHERE절 조건으로 입력되게 하고, 입력된 회사의 정보를 가져오기 위한 것
  def getname():
    if request.method=='POST':
      datas = request.get_json()
      value = datas['name']
      cur = db.cursor(pymysql.cursors.DictCursor)
      cur.execute(f"SELECT market,code,name FROM CompanyList WHERE NAME = '{value}'")
      res = cur.fetchall()
      code = res[0]["code"]
      market = res[0]["market"]

      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day,ROUND((high+low)/2,1) AS mid, ROUND((((high+low)/2)*0.04),2) AS medomesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      res2 = cur.fetchall()
      return res2
