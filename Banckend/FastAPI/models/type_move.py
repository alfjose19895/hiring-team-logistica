import peewee
import sys
sys.path.append("..")
from packges_module import db 
from datetime import datetime

class TypeMove(peewee.Model):
  id          =  peewee.AutoField()
  type        =  peewee.CharField(max_length=2)
  description =  peewee.CharField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "type_moves"

if __name__ == "__main__":
  if not TypeMove.table_exists():
    TypeMove.create_table()
