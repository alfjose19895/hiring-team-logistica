from datetime import datetime
import schemas.product as product_schema
import schemas.product_history as product_history_schema
from models.product import Product as ProductModel
from models.product_history import ProductHistory as ProductHistoryModel
from fastapi import HTTPException,status
from operator import attrgetter
import peewee

#? Metodo encargado de cambiar la estructura de un ProductFull a ProductHistory
def change_product_to_produc_history(product: product_schema.ProductFull)->product_history_schema.ProductHistory:
  product_hist  = product
  product_hist  = product_history_schema.ProductHistory(**dict(product))
  product_hist.product_id= product.id
  return product_hist

#? Metodo encargado buscar registros por un solo valor en la tabla product
def search_product_db(key: str, value)->product_schema.ProductFull:
  try:
    product = ProductModel.get(attrgetter(key)(ProductModel)==value)
    print(product)
    product = product_schema.ProductFull(**product_schema.product_schema_function(product))
  except peewee.DoesNotExist:
    product = None
  return product

#? Metodo encargado crear registros en la tabla product
def create(product: product_schema.Product):
  try:
    product= product_schema.Product(**dict(product))
    if search_product_db("code",product.code)== None:
      product_dict= dict(product)
      del product_dict["id"]
      del product_dict["stock"]
      product = ProductModel.create(**product_dict)
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El producto ya existe")
  except peewee.IntegrityError:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La Categoria a Ingresar no existe")
  return product

#? Metodo encargado actualizar registros en la tabla product y agregar registro en la tabal product_history
def update(product: product_schema.ProductUpdte):
  try:
    produ=search_product_db("id",product.id)
    if produ != None:
      print( product_schema.ProductUpdte(**dict(produ)), "1")
      print( product, "2")
      if product_schema.ProductUpdte(**dict(produ))== product:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existen cambios en la actualizacion")
      product_history = change_product_to_produc_history(produ)
      produ.code  = product.code
      produ.name  = product.name
      produ.category_id= product.category_id
      produ.stock= product.stock
      produ.state= product.state
      produ.updated_at= datetime.now()
      produ_execute = ProductModel.update(**dict(produ)).where(ProductModel.id == product.id)
      produ_execute.execute()
      del product_history.id
      ProductHistoryModel.create(**dict(product_history))
      return produ
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El producto a actualizar  no existe")
  except peewee.DataError:
    return None
  except peewee.IntegrityError as e:
    cod_error = str(e).rsplit(",")[0].replace("(","")
    print( str(e))
    if int(cod_error)==1062:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No se puede actualziar el producto con un codigo de un producto ya existente")
    if int(cod_error)==1452:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existe la categoria a actualizar")
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Error al actualizar el producto")

#? Metodo encargado eliminar(actualizar state=false) registros en la tabla product y agregar registro en la tabal product_history
def delete(id: int)->bool:
  try:
    produ=search_product_db("id",id)
    if produ != None:
      product_history = change_product_to_produc_history(produ)
      produ.state = False
      produ.updated_at= datetime.now()
      produ = ProductModel.update(**dict(produ)).where(ProductModel.id == id)
      produ.execute()
      del product_history.id
      ProductHistoryModel.create(**dict(product_history))
      return True
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El producto a actualizar  no existe")
  except peewee.DataError:
    produ = False