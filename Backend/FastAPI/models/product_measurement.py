import peewee
import sys
sys.path.append("..")
from models.product import Product
from traits import db 
from datetime import datetime

class ProductMeasurement(peewee.Model):
  id          =  peewee.AutoField()
  product_id  =  peewee.ForeignKeyField(Product, to_field="id")
  depth       =  peewee.DecimalField(max_digits=5, decimal_places=2)
  width       =  peewee.DecimalField(max_digits=5, decimal_places=2)
  height      =  peewee.DecimalField(max_digits=5, decimal_places=2)
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())
  state       =  peewee.BooleanField(default=True)

  class Meta:
    database  = db.database
    db_table  = "product_measurements"

if __name__ == "__main__":
  if not Product.table_exists():
    Product.create_table()
  if not ProductMeasurement.table_exists():
    ProductMeasurement.create_table()