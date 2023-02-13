import schemas.product_history as product_historySchema
from models.product_history import product_history as product_historyModel
from fastapi import HTTPException,status
import peewee

def create(product_history: product_historySchema.product_history):
  try:
    product_history_dict= dict(product_history)
    product_history = product_historyModel.create(**product_history_dict)
  except peewee.IntegrityError:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La Categoria a Ingresar no existe")
  return product_history