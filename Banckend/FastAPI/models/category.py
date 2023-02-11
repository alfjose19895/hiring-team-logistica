import peewee
import sys
sys.path.append("..")
from traits import db 
from datetime import datetime

class Category(peewee.Model):
  id          =  peewee.AutoField()
  description =  peewee.CharField(unique=True) 
  state       =  peewee.BooleanField(default=True) 
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "categories"

if __name__ == "__main__":
  if not Category.table_exists():
    Category.create_table()