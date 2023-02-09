import peewee
import sys
sys.path.append("..")
from models.category import Category
from packges_module import db 
from datetime import datetime

class Product(peewee.Model):
  id          =  peewee.AutoField()
  code        =  peewee.CharField(unique=True, null=False )
  name        =  peewee.CharField()
  category_id =  peewee.ForeignKeyField(Category, to_field="id")
  stock       =  peewee.BooleanField(default=True)
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "products"

if __name__ == "__main__":
  if not Category.table_exists():
    Category.create_table()
  if not Product.table_exists():
    Product.create_table()