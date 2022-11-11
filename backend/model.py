import pymysql


class dusickdb():
  def get_all():
    conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
    cur = conn.cursor(pymysql.cursors.DictCursor) 

    name = '동화약품'
    
    cur.execute(f"SELECT open, high, low, close, volume FROM (SELECT code,market,name FROM companylist WHERE name={name})")
    
    dusick_lists = cur.fetchall()
    return dusick_lists
    


# conn = None
# cur = None

# data1=""
# data2=""
# data3=""
# data4=""
# data5=""



# conn = pymysql.connect(user="root",passwd="00000000",host="127.0.0.1",db="aitrading_db",charset="utf8")
# cur = conn.cursor()

# cur.execute('SELECT * FROM companylist')
# print("오픈  상승  하락  마감   거래량")
# print("===============================")

# while(True):
#   row = cur.fetchone()
#   if row == None:
#     break

#   data1=row[0]
#   data2=row[1]
#   data3=row[2]
#   data4=row[3]
#   data5=row[4]

#   print(data1,data2,data3,data4,data5)

# conn.close()