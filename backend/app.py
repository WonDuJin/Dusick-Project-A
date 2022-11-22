from flask import Flask, jsonify, request
from flask_cors import CORS 
# from config import db
from models import DataRoute

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app)


@app.route('/<market>', methods=['GET'])
def allSearch(market):
    data = DataRoute.markets(market)
    return jsonify(data)

@app.route('/getnames', methods = ['POST'])
def getname():
    data = DataRoute.getname()
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)