import peewee
from datetime import datetime
import sys
sys.path.append("..")
from models.category import Category
from models.product import Product
from packges_module import db 

class ProductHistory(peewee.Model):
  id          =  peewee.AutoField()
  product_id  =  peewee.ForeignKeyField(Product, to_field="id")
  code        =  peewee.CharField(null=False )
  name        =  peewee.CharField()
  category_id =  peewee.ForeignKeyField(Category, to_field="id")
  stock       =  peewee.BooleanField(default=True)
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "product_history"

if __name__ == "__main__":
  if not Category.table_exists():
    Category.create_table()
  if not Product.table_exists():
    Product.create_table()
  if not ProductHistory.table_exists():
    ProductHistory.create_table()