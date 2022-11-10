from flask import Flask, jsonify, request
from model import dusickdb

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/',methods=['POST'])
def test():
  args = request.json
  string = args['review']
  data = dusickdb.get_all()
  return jsonify(data)

