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

  def market(market):
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)    
    
    # Companylist 조회
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" LIMIT 28')
    dusick_lists = cur.fetchall()
    

    # 조회한 DB에서 code, market, name을 변수로 지정
    # 빈 배열을 생성하고, 반복문을 통하여 빈 배열에 값을 추가
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      
      # SQL 문
      cur.execute(f'SELECT companylist.code AS code,market,name,open,high,low,close,volume,day FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE volume < 5000000 AND day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 1')
      conn.commit()
      day = cur.fetchall()
      data_stack.append(day)

      #pandas
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
    
    # 리턴값을 위에 선언한 배열을 반환한다.
    return data_stack

  #매개 변수로 market값을 받는다.
  def info(market):
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor)
      
    # companylist에서 랜덤으로 28개의 회사 값을 뽑아옴
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" ORDER BY rand() LIMIT 28')
    dusick_lists = cur.fetchall()
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      # print([code],[market])     
      markettype = market.upper()      
      
      # SQL문 
      cur.execute(f'SELECT companylist.code AS code,market,name,open,high,low,close,volume,day, ROUND((high+low)/2,1) AS MID, ROUND((((high+low)/2)*0.04),2) AS MedoMesu FROM {market}_{code}_d AS api LEFT JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      conn.commit()
      volume = cur.fetchall()
      data_stack.append(volume)
      
      #pandas
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
      
    return data_stack



