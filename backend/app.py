from flask import Flask,jsonify,request
from flask_cors import CORS
from model import DataRoute
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app,resources={r'*':{'origins':'http://localhost:3000'}},supports_credentials=True)

#kospi or kosdak을 URL에 입력하면 이를 매개변수로 받아 조회하도록 설정
@app.route('/<market>',methods=['GET'])
def allSearch(market):
  data = DataRoute.markets(market)
  return jsonify(data)

# 프론트에서 리스트에 출력된 회사 정보를 클릭시 회사의 이름을 전송받아 조회할 수 있도록 설정
@app.route('/getnames',methods=['POST'])
def getname():
  data= DataRoute.getname()
  return jsonify(data)
  