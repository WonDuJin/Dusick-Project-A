import pymysql
from flask import Flask, jsonify, request
import pandas as pd
from sqlalchemy import create_engine


class dusickdb():
  def get_all():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)    

    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()   
    
      
    

    #SQL문으로 Companylist 전체 DB 조회"
    
    return dusick_lists

  def get_api():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨
    
    market = "kospi"

    #SQL문으로 Companylist DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}"')
    dusick_lists = cur.fetchall()
    

    #조회한 DB에서 code, market, name을 변수로 지정

    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      print([code],[market])      
      markettype = market.upper()
      
      cur.execute(f'ALTER TABLE {market}_{code}_d ADD code VARCHAR(15) DEFAULT "{code}"')
      conn.commit()
      api = cur.fetchall()
      df = pd.DataFrame(api)
      print(df)
    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력

    return jsonify()
