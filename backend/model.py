import pymysql
from flask import Flask, jsonify, request
import pandas as pd
from sqlalchemy import create_engine
from tabulate import tabulate

class dusickdb():
    #SQL문으로 Companylist 전체 DB 조회"
  def get_all():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)    

    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()   

    return dusick_lists

  def get_api(market):
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨   
    
    
    #SQL문으로 Companylist DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" LIMIT 50')
    dusick_lists = cur.fetchall()
    

    #조회한 DB에서 code, market, name을 변수로 지정
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      # print([code],[market])     
      markettype = market.upper()
      
      cur.execute(f'SELECT companylist.code AS code,market,name,open,high,low,close,volume,day FROM {market}_{code}_m as api INNER JOIN companylist ON companylist.code = api.code WHERE name="동화약품" LIMIT 2')
      conn.commit()
      api = cur.fetchall()
      data_stack.append(api)
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
      # print(df)

    print(data_stack)
      

    # 문자리터럴로 변수를 sql문에 입력하여 DB 조회 출력

    return data_stack
