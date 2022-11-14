from flask import Flask, jsonify, request
from model import dusickdb


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/companylist',methods=['POST','GET'])

def test():
  data = dusickdb.get_all()
  return jsonify(data)

@app.route('/market',methods =['GET','POST'])
def api():
  data = dusickdb.get_api()
  return data

@app.route('/volume',methods =['GET','POST'])
def volume():
  data = dusickdb.get_volume()
  return jsonify(data)


# @app.route('/api',methods=['GET'])
# def get_api():
#   data1 = api.get_api()
#   return jsonify(data1)
# import os
# import requests
# from flask import Flask,jsonify,request
# from flask_mysqldb import MySQL
# from flask_cors import CORS
# from dotenv import load_dotenv
# import pymysql

# load_dotenv()

# app = Flask(__name__)
# CORS(app)
# mysql = MySQL(app)

# app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
# app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
# app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
# app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")

# # url = "http://127.0.0.1:5000/test"
# # data = request.get(url).json()

# # print(data);

# @app.route('/api',methods=['GET'])
# def apis():
#   url = "http://127.0.0.1:5000/test"
#   data = requests.get(url).json()
#   data_state = data[0][0]
#   data_code = data[0][1]
#   print(data[0][2])
#   if request.method == 'GET':
#     cur = pymysql.connection.cursor()
#     cur.execute("SELECT * FROM {data1}_{data2}_m ORDER BY day ASC".format(data1=data_state,data2=data_code))
#     res = cur.fetchall()
#     return jsonify(res)
  
# @app.route('/test',methods=['GET'])
# def visit():
#   if request.method == 'GET':
#     cur = mysql.connection.cursor()
#     name = "기아"
#     cur.execute(f"SELECT market,code,name FROM companylist from WHERE name='{name}' ")
#     res = cur.fetchall()
#     return jsonify(res)
  
# if __name__ == '__main__':
#   app.run(debug=True)