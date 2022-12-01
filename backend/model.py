import pymysql.cursors
from flask import request
from dbconnection import db_connection

db = db_connection

class DataRoute():
  
  def markets(market):
    cur = db.cursor(pymysql.cursors.DictCursor)
    cur.execute(f"SELECT market,code,name FROM CompanyList WHERE market = '{market}' ORDER BY RAND() LIMIT 28")
    res = cur.fetchall()
    data_stack = list()
    for i in range(len(res)):
      code = res[i]["code"]
      market = res[i]["market"]
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day,ROUND((high+low)/2,1) AS mid, ROUND((((high+low)/2)*0.04),2) AS medomesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
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
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day,ROUND((high+low)/2,1) AS mid, ROUND((((high+low)/2)*0.04),2) AS medomesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      res2 = cur.fetchall()
      return res2
    
  def getDay(name):
    cur = db.cursor(pymysql.cursors.DictCursor)
    cur.execute(f"SELECT market,code,name FROM CompanyList WHERE name = '{name}' ORDER BY RAND() LIMIT 28")
    res = cur.fetchall()
    data_stack = list()
    for i in range(len(res)):
      code = res[i]["code"]
      market = res[i]["market"]
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,date_format(day,"%Y-%m-%d") dateonly,ROUND((high+low)/2,1) AS mid FROM {market}_{code}_m AS api INNER JOIN companylist ON companylist.code = api.code WHERE day between date("2021-02-03") and date("2022-02-03")+1 ORDER BY day asc limit 12')
      res2 = cur.fetchall()
      data_stack.append(res2)
    return data_stack

  def getSearch(name):
      cur = db.cursor(pymysql.cursors.DictCursor)
      cur.execute(f"SELECT market,code,name FROM CompanyList WHERE name = '{name}'")
      res = cur.fetchall()
      code = res[0]["code"]
      market = res[0]["market"]
      cur.execute(f'SELECT companylist.code AS code,market,name,high,low,close,volume,day,ROUND((high+low)/2,1) AS mid, ROUND((((high+low)/2)*0.04),2) AS medomesu FROM {market}_{code}_d AS api INNER JOIN companylist ON companylist.code = api.code WHERE day BETWEEN date("2022-01-27") AND date("2022-01-28")+1 ORDER BY day DESC LIMIT 2')
      res2 = cur.fetchall()
      return res2
    
  def getSearchInput(name):
      cur = db.cursor(pymysql.cursors.DictCursor)
      cur.execute(f"SELECT market,code,name FROM CompanyList WHERE name Like '%{name}%' limit 10")
      res = cur.fetchall()
      return res