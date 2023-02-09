import peewee
import sys
sys.path.append("..")
from packges_module import db 
from datetime import datetime

class User(peewee.Model):
  id          =  peewee.AutoField()
  email       =  peewee.CharField() 
  password    =  peewee.CharField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "users"

if __name__ == "__main__":
  if not User.table_exists():
    User.create_table()