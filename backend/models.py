from flask import Flask, jsonify, request, json 
from config import cursor
from config import db 



class DataRoute():
    
    def markets(market):
        cursor.execute(f"SELECT market, code, name FROM companylist WHERE market = '{market}' LIMIT 10")
        res = cursor.fetchall()
        
        data_stack = list()
        for i in range(len(res)):
            market = res[i]["market"]
            code = res[i]["code"]
            
            sql = f"SELECT companylist.code AS code, market, name, open, high, low, close, volume, day FROM {market}_{code}_d AS res INNER JOIN companylist ON companylist.code = res.code LIMIT 2"
            cursor.execute(sql)
            res2 = cursor.fetchall()
            data_stack.append(res2)
        return data_stack

        
    def getname():
        if request.method == 'POST':
            datas = request.get_json()
            value = datas['name']
            cursor.execute(f"SELECT market, code, name FROM CompanyList WHERE NAME = '{value}'")
            res = cursor.fetchall()
            market = res[0]["market"]
            code = res[0]["code"]
            cursor.execute(f"SELECT companylist.code AS code, market, name, open, high, low, close, volume, day FROM {market}_{code}_d AS res INNER JOIN companylist ON companylist.code = res.code LIMIT 2")
            res2 = cursor.fetchall()
            return res2
            
        