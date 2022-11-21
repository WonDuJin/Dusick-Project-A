from flask import Flask, jsonify, request
from model import dusickdb



app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/companylist',methods=['POST','GET'])
def test():
  data = dusickdb.get_all()
  return jsonify(data)

@app.route('/<market>',methods =['GET','POST'])
def day(market):
  
  data = dusickdb.day(market)
  
  
  return data

@app.route('/<market>/volume',methods =['GET','POST'])
def volume(market):
  data = dusickdb.volume(market)
  return data
