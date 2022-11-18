from flask import Flask,jsonify
from flask_cors import CORS
from model import DataRoute
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/<market>',methods=['GET'])
def allSearch(market):
  data = DataRoute.markets(market)
  return jsonify(data)

@app.route('/getname',methods=['post'])
def getname:
  
# @app.route('/<market>/volume',methods=['GET'])
# def volume(market):
#   data = DataRoute.volumes(market)
#   return jsonify(data)
# from=>where=>group by - having - select - order by 순으로 실행