from flask import Flask, jsonify, request
from model import dusickdb

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/companylist', methods=['GET', 'POST'])
def alpha():
  data = dusickdb.get_all()
  return jsonify(data)

@app.route('/<market>', methods=['GET', 'POST'])
def beta(market):
  data = dusickdb.get_api(market)
  return data

@app.route('/<market>/volume',methods =['GET','POST'])
def volume(market):
  data = dusickdb.volume(market)
  return data


if __name__ == '__main__':
  app.run(debug=True)