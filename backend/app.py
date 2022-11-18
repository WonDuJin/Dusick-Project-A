# import os
import requests
from config import cursor
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from tabulate import tabulate
from config import db



# Flask 객체 인스턴스 생성
app = Flask(__name__)

CORS(app)


# mysql = MySQL(app)
app.config['JSON_AS_ASCII'] = False
# 한글 글씨 깨질 때 쓰기 


# 접속 url 설정

@app.route('/')
def api():
    if request.method =='GET':
        sql = "SELECT market, code, name FROM companylist"
        # companylist 전체 DB조회
        cursor.execute(sql)
        res = cursor.fetchall()
        df = pd.DataFrame(res)
        # pandas DataFrame 형식으로 바꿔줌
        print(df)
        # print(tabulate(df, headers='keys', tablefmt='fancy_grid',stralign='center', showindex=True))
        # pandas 테이블 형식으로 바꿔줌
        return jsonify(res)

# @app.route('/test', methods=['POST'])
# def test():
#     args = request.json
#     string = args['review']
    

# @app.route('/api', methods=['GET'])
# def apis():
#     url = "http://127.0.0.1:5000"
#     data = requests.get(url).json()
#     print(data)
#     return jsonify(data)


@app.route('/<market>', methods=['GET'])  
def apis(market):
    # url = "http://127.0.0.1:5000"
    # data = requests.get(url).json()
    # data_market = data[0][0]
    # data_code = data[0][1]
    # print(data[0][2])
    # if request.method == 'GET':
        # sql = "SELECT market, code, name FROM companylist WHERE market = '{market}'"
        # market이 kospi 인 애들만 가져옴
        cursor.execute(f"SELECT market, code, name FROM companylist WHERE market = '{market}' LIMIT 10")
        res = cursor.fetchall()

        data_stack = list()
        for i in range(len(res)):
            market = res[i]["market"]
            code = res[i]["code"]
            # name = res[i]["name"]
            # print([market], [code])
            # markettype = market.upper()

            # upper()는 대문자 변경 함수
            sql = f"SELECT companylist.code AS code, market, name, open, high, low, close, volume, day FROM {market}_{code}_d AS res INNER JOIN companylist ON companylist.code = res.code LIMIT 2"
            cursor.execute(sql)
            # db.commit()

            # cursor.execute(f"ALTER TABLE {market}_{code}_m ADD code VARCHAR(15) DEFAULT '{code}'")
            # 테이블에 code 칼럼 넣어주는 sql
            res2 = cursor.fetchall()
            data_stack.append(res2)
            # df = pd.DataFrame(res2)

            # print(data_stack)

        return jsonify(data_stack)

        # print(res[0])
        # a = list()
        # for key in res:
        #     market = key.get('market')
        #     code = key.get('code')
        #     a.append([market,code])
        #     print(a)
        # a =list()
        # for i in res:
        #     a.append([i.get('market'),i.get('code')])
        # print(a)
        # sql = f"SELECT * FROM {market}_{code}_m ORDER BY day ASC"
        # return jsonify(res)




# @app.route('/market', methods=['GET'])  
# def apis(market, code):
#     url = "http://127.0.0.1:5000"
#     # data = requests.get(url).json()
#     # data_market = data[0][0]
#     # data_code = data[0][1]
#     # print(data[0][2])
#     if request.method == 'GET':
#         sql = f"SELECT * FROM {market}_{code}_m ORDER BY day ASC"
#         # sql = "SELECT market, code, name FROM companylist WHERE market = 'kospi'"
#         # market이 kospi 인 애들만 가져옴
#         cursor.execute(sql)
#         res = cursor.fetchall()
#         # print(type(res))
#         for key, val in res.items():
#             print("key = {market}, value={code}" .format(key=key, value=val))
#         return jsonify(res)



@app.route('/market/<code>/<market>/<name>', methods=['GET'])
def visit(market, code):
    if request.method =='GET':
        # MySQL 명령어 실행
        sql = f"SELECT * FROM {market}_{code}_m ORDER BY day ASC"
        # for i in sql:
        cursor.execute(sql) 
            
        # cursor.execute(f"SELECT * FROM {market}_{code}_m ORDER BY day ASC") 
        # cursor.execute(f"SELECT market, code, name FROM companylist WHERE market = 'kospi' and code = '{code}'") 
        # Flask에서 제공하는 json 변환 함수, 모든 데이터를 한 번에 가져올 때 사용 
        res = cursor.fetchall()
        print([market],[code])
        return jsonify(res)
            

# 쿼리문 
    # if request.method =='POST':
    #     name = request.json['visitor_name']
    #     # mysql 접속 후 cursor 생성하기
    #     cur = mysql.connection.cursor()
    #     # DB 데이터 삽입하기
    #     cur.execute("INSERT INTO visits (visitor_name) VALUES(%)", [name])
    #     # DB에 수정사항 반영하기
    #     mysql.connection.commit()
    #     # mysql cursor 종료하기
    #     cur.close()
    #     return


if __name__ == '__main__':
    app.run(debug=True)

# __name__ 변수는 파이썬이 내부적으로 사용하는 특별한 변수명.
# __name__이 __main__이라는 값을 가지게 되면 해당 모듈이 주 프로그램이라는 소리이고, 해당 모듈을 실행시키지 않고 import 했을 때는 모듈 이름이 __name__으로 들어감. 


# app.run(debug=Ture) 라고 명시하면 해당 파일의 코드를 수정할 때 마다 Flask가 변경된 것을 인식하고 다시 시작함. 

# fetchone() 한 번 호출에 하나의 행만 가져올 때 사용
# fetchmany(n) n개만큼의 데이터를 가져올 때 사용 
