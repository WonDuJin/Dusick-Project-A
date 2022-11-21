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

  def day(market):
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)

    #프론트에서 이제 이름을 받아오는 걸 설정해주면 됨   
    
    
    #SQL문으로 Companylist DB 조회"
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" LIMIT 28')
    dusick_lists = cur.fetchall()
    

    #조회한 DB에서 code, market, name을 변수로 지정
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      

      cur.execute(f'WITH company AS (SELECT code, name, market FROM companylist WHERE market="{market}" ORDER BY rand() LIMIT 28), info AS (SELECT * FROM {market}_{code}_d WHERE day = "2022-01-28") SELECT company.code AS code,name,market,open,high,low,close,volume,ROUND((high+low)/2,1) AS MID, ROUND((((high+low)/2)*0.04),2) AS MedoMesu FROM info INNER JOIN company WHERE info.code = company.code')
      conn.commit()
      day = cur.fetchall()
      data_stack.append(day)
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
    
    return data_stack

  def volume(market):
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)
      
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" ORDER BY rand() LIMIT 30')
    dusick_lists = cur.fetchall()
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      # print([code],[market])     
      markettype = market.upper()      
      
      cur.execute(f'SELECT companylist.code AS code,market,name,open,high,low,close,volume,day, ROUND((high+low)/2,1) AS MID, ROUND((((high+low)/2)*0.04),2) AS MedoMesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      conn.commit()
      volume = cur.fetchall()
      data_stack.append(volume)
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
      
    return data_stack



