from datetime import datetime
from pydantic import BaseModel, validator

#?metodo que retorna la estructura de un modelo category
def stock_schema_function(stock)->dict:
  return {
    "id"          : stock.id,
    "type_id"     : stock.type_id,
    "product_id"  : stock.product_id,
    "unid"        : stock.unid,
    "state"       : stock.state,
    "created_at"  : stock.created_at,
    "updated_at"  : stock.updated_at
  }
#?metodo que retorna la lista estructura de un modelo category
def stocks_schema_function(stocks)->list:
  return [stock_schema_function(stock) for stock in stocks]

class Sctock(BaseModel):
  id:         int | None
  type_id:    int | None
  product_id: int | None
  unid:       int | None
  created_at: datetime | None
  updated_at: datetime | None
  state:      bool| None
  
  class Config:
    validate_assignment = True
  @validator('state')
  def set_state(cls, state):
    return state==None or state
