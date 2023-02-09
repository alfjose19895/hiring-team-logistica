import peewee
import db
from Banckend.FastAPI.models.type_move import TypeMove
from datetime import datetime

class Stock(peewee.Model):
  id          =  peewee.BigAutoField() 
  type_id     =  peewee.ForeignKeyField(TypeMove, to_field="id")
  unid        =  peewee.IntegerField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "Stocks"