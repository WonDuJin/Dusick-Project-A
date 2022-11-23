from flask import Flask, jsonify, request
from model import dusickdb


#라우터
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/companylist',methods=['POST','GET'])
def test():
  data = dusickdb.get_all()
  return jsonify(data)

@app.route('/<market>',methods =['GET','POST'])
def market(market):
  
  data = dusickdb.market(market)
  
  
  return data

@app.route('/<market>/info',methods =['GET','POST'])
def info(market):
  data = dusickdb.info(market)
  return data
