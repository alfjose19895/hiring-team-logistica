import schemas.stock as StockSchema
from models.stock import Stock as StockModel
import peewee
import sys
sys.path.append("..")
from traits import db 
#? funcion que determina si existe o no stock de un producto
#@ return StockSchema.CategoryFull
def search_stock_db(id_product:int)->bool:
  try:
    query = """select 
            SUM(case when type_id = 1 then unid else 0 end)-SUM(case when type_id = 2 then unid else 0 end)  FROM stocks where product_id="""+str(id_product)+""";"""
    #print("joroooooooooooooo")
    stock = db.database.execute_sql(query)
    stock = list(stock.fetchall())[0][0]
    if stock==None or stock<=0:
      #print(query)
      return False
    else:
      return True
  except peewee.DoesNotExist:
    return False