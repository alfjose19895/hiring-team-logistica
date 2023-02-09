import peewee
from Banckend.FastAPI.models.category import Category
import db
from datetime import datetime

class Product(peewee.Model):
  id          =  peewee.IdentityField(generate_always=True)
  code        =  peewee.CharField(unique=True)
  name        =  peewee.CharField()
  category_id =  peewee.ForeignKeyField(Category, to_field="id")
  stock       =  peewee.BooleanField(default=True)
  created_at  =  peewee.DateTimeField(default=datetime.now())  
  updated_at  =  peewee.DateTimeField(default=datetime.now())

  class Meta:
    database  = db.database
    db_table  = "products"