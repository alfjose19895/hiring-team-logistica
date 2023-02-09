import peewee
import db
from datetime import datetime

class TypeMove(peewee.Model):
  id          =  peewee.BigAutoField() 
  type        =  peewee.CharField(max_length=2)
  description =  peewee.CharField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "type_moves"