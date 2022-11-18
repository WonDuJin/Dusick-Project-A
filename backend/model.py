import pymysql.cursors
import pandas as pd
import numpy as np
from flask import Flask,jsonify,request,json
from dbconnection import db_connection

db = db_connection

class DataRoute():
  
  def markets(market):
    cur = db.cursor(pymysql.cursors.DictCursor)
    cur.execute(f"SELECT market,code,name FROM CompanyList WHERE market = '{market}' order by rand() LIMIT 28")
    res = cur.fetchall()
    data_stack = list()
    for i in range(len(res)):
      code = res[i]["code"]
      market = res[i]["market"]
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      res2 = cur.fetchall()
      data_stack.append(res2)
    return data_stack
  
  def getname():
    if request.method=='POST':
      datas = request.get_json()
      value = datas['name']
      cur = db.cursor(pymysql.cursors.DictCursor)
      cur.execute(f"SELECT market,code,name FROM CompanyList WHERE NAME = '{value}'")
      res = cur.fetchall()
      code = res[0]["code"]
      market = res[0]["market"]
      cur.execute(f'SELECT market,name,open,high,low,close,volume,day  FROM {market}_{code}_m as api INNER JOIN companylist ON companylist.code = api.code ORDER BY DAY DESC LIMIT 1')
      res2 = cur.fetchall()
      return res2
  
    # def get_api(market): // ★1. 함수이름
    # conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    # cur = conn.cursor(pymysql.cursors.DictCursor)

    # #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨   
    
    # #SQL문으로 Companylist DB 조회"
    # cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" LIMIT 10')
    # dusick_lists = cur.fetchall() //★2. 조회한 데이터를 변수에 담아준다
    

    # #조회한 DB에서 code, market, name을 변수로 지정
    # data_stack = list()★3. 빈배열 선언
    # for i in range(len(dusick_lists)): //★3. for문을 돌림 len(조회한데이터를 담은 변수)
    #   code = dusick_lists[i]["code"] // 필드명이 코드인 데이터를담음
    #   market = dusick_lists[i]["market"] //필드명이 마켓인 데이터를 담음
    #   # print([code],[market]) //★4. 일단 찍어본다(아마 쭈르르르륵 나올거당)
      
    # cur.execute(f'ALTER TABLE {market}_{code}_m ADD code VARCHAR(15) DEFAULT "{code}"')
    # conn.commit() ★5. ALTER문으로 필드를 넣어준다 
    # 데이터가 들어가는 예시 ex) ALTER TABLE KOSPI_000020_m code VARCHAR(15) DEFAULT "000020"
    # ★7. DB에 들어가서 들어갔는지 확인해 준다.
    # ★8. 데이터가 들어가면 저 쿼리문을 바꿔서 넣어준다 m,d,r,f => 다넣어준후 저 쿼리문은 버린다 (데이터가 또들어가면 안되기 때문에.)