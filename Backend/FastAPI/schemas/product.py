from datetime import datetime
from pydantic import BaseModel,validator


#?metodo que retorna la estructura de un modelo product
def product_schema_function(product)->dict:
  return {
    "id"          : product.id,
    "code"        : product.code,
    "name"        : product.name,
    "stock"       : product.stock,
    "category_id" : product.category_id.id,
    "category"    : product.category_id,
    "created_at"  : product.created_at,
    "updated_at"  : product.updated_at,
    "state"       : product.state
  }

#?metodo que retorna la estructura list de un modelo product
def products_schema_function(products)->list:
  return [product_schema_function(product) for product in products]

class Product(BaseModel):
  id:         int|None
  code:       str
  name:       str
  stock:      bool|None
  category_id:int
  state:      bool|None

  class Config:
        validate_assignment = True

  @validator('state')
  def set_state(cls, state):
    return state==None or state
  
  @validator('stock')
  def set_stock(cls, stock):
    return stock==None or stock

class ProductUpdte(BaseModel):
  id:         int
  code:       str
  name:       str
  stock:      bool|None
  category_id:int
  state:      bool

class ProductFull(Product):
  created_at: datetime
  updated_at: datetime

class ProductSearch(BaseModel):
  code:       str|None
  name:       str|None
  category_id:int|None
  stock:      bool|None
