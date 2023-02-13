from datetime import datetime
from pydantic import BaseModel

def product_history_schema_function(product_history)->dict:
  return {
    "id"          : product_history.id,
    "product_id"  : product_history.product_id.id,
    "code"        : product_history.code,
    "name"        : product_history.name,
    "stock"       : product_history.stock,
    "category_id" : product_history.category_id.id,
    "created_at"  : product_history.created_at,
    "updated_at"  : product_history.updated_at,
    "state"       : product_history.state
  }

def categories_schema_function(categories)->list:
  return [product_history_schema_function(product_history) for product_history in categories]

class ProductHistory(BaseModel):
  id:         int
  product_id: int|None
  code:       str
  name:       str
  stock:      bool
  category_id:int
  state:      bool

class ProductHistoryFull(ProductHistory):
  created_at: datetime
  updated_at: datetime