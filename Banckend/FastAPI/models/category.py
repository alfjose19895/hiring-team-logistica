import peewee
import db
from datetime import datetime

class Category(peewee.Model):
  id          =  peewee.BigAutoField() 
  description =  peewee.CharField() 
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "categories"