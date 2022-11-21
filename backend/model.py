import pymysql
from flask import Flask, jsonify, request
import pandas as pd
from sqlalchemy import create_engine
import config
from tabulate import tabulate

class dusickdb():
  def get_all():
    conn = config.db_connector()
    cur = conn.cursor(pymysql.cursors.DictCursor)    

    cur.execute(f'SELECT code,market,name FROM companylist')
    dusick_lists = cur.fetchall()
    
    return dusick_lists

  def get_api(market):
    conn = config.db_connector()
    cur = conn.cursor(pymysql.cursors.DictCursor)

    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" LIMIT 10')
    dusick_lists = cur.fetchall()
    
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      # print([code],[market])     
      markettype = market.upper()
      
      cur.execute(f'SELECT market,name,open,high,low,close,volume,day  FROM {market}_{code}_m as api INNER JOIN companylist ON companylist.code = api.code  LIMIT 2')
      conn.commit()
      api = cur.fetchall()
      data_stack.append(api)
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
      return api

  def volume(market):
    conn = config.db_connector()
    cur = conn.cursor(pymysql.cursors.DictCursor)
      
    cur.execute(f'SELECT code,market,name FROM companylist WHERE market="{market}" ORDER BY rand() LIMIT 30')
    dusick_lists = cur.fetchall()
    data_stack = list()
    for i in range(len(dusick_lists)):
      code = dusick_lists[i]["code"]
      market = dusick_lists[i]["market"]
      # print([code],[market])     
      markettype = market.upper()      
      
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      conn.commit()
      volume = cur.fetchall()
      data_stack.append(volume)
      df = pd.DataFrame(data_stack)
      print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
      
    return data_stack