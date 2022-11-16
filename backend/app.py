from flask import Flask, jsonify, request
from model import dusickdb



app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
@app.route('/companylist',methods=['POST','GET'])

def test():
  data = dusickdb.get_all()
  return jsonify(data)

@app.route('/market/<market>',methods =['GET','POST'])
def api(market):
  
  data = dusickdb.get_api(market)
  
  return data

@app.route('/volume',methods =['GET','POST'])
def volume():
  data = dusickdb.get_volume()
  return jsonify(data)
