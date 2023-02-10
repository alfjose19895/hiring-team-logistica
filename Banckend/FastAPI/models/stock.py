import peewee
import sys
sys.path.append("..")
from traits import db 
from models.type_move import TypeMove
from datetime import datetime

class Stock(peewee.Model):
  id          =  peewee.AutoField() 
  type_id     =  peewee.ForeignKeyField(TypeMove, to_field="id")
  unid        =  peewee.IntegerField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "Stocks"

if __name__ == "__main__":
  if not TypeMove.table_exists():
    TypeMove.create_table()
if not Stock.table_exists():
  Stock.create_table()