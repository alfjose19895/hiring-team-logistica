import peewee
import db
from datetime import datetime

class User(peewee.Model):
  id          =  peewee.BigAutoField() 
  email       =  peewee.CharField() 
  password    =  peewee.CharField()
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "users"