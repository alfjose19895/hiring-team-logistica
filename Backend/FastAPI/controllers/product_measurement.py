from datetime import datetime
import schemas.product_measurement as product_measurement_schema
from models.product_measurement import ProductMeasurement as product_measurementModel
from fastapi import HTTPException,status
from operator import attrgetter
import peewee

#? Metodo encargado buscar registros por un solo valor en la tabla product_measurement
def search_product_measurement_db(key: str, value)->product_measurement_schema.ProductMeasurement:
  try:
    product_measurement = product_measurementModel.get(attrgetter(key)(product_measurementModel)==value)
    #print(product_measurement)
    product_measurement = product_measurement_schema.ProductMeasurement(**product_measurement_schema.product_measurement_schema_function(product_measurement))
  except peewee.DoesNotExist:
    product_measurement = None
  return product_measurement

#? Metodo encargado crear registros en la tabla product_measurement
def create(product_measurement: product_measurement_schema.ProductMeasurement):
  try:
    if search_product_measurement_db("product_id",product_measurement.product_id)== None:
      product_measurement_dict= dict(product_measurement)
      del product_measurement_dict["id"]
      product_measurement = product_measurementModel.create(**product_measurement_dict)
    else:
      product_measurement=None
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El product_measuremento ya existe")
    return product_measurement
  except peewee.IntegrityError:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La producto_id a Ingresar no existe")

#? Metodo encargado actualizar registros en la tabla product_measurement y agregar registro en la tabal product_measurement_history
def update(product_measurement: product_measurement_schema.ProductMeasurement):
  try:
    produ=search_product_measurement_db("product_id",product_measurement.product_id)
    if produ != None:
      #print( product_measurement_schema.product_measurementUpdte(**dict(produ)), "1")
      #print( product_measurement, "2")
      if product_measurement_schema.product_measurementUpdte(**dict(produ))== product_measurement:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existen cambios en la actualizacion")
      produ.width  = product_measurement.width
      produ.height  = product_measurement.height
      produ.depth= product_measurement.depth
      produ.state= product_measurement.state
      produ.updated_at= datetime.now()
      produ_execute = product_measurementModel.update(**dict(produ)).where(product_measurementModel.id == product_measurement.id)
      produ_execute.execute()
      return produ
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El product_measuremento a actualizar  no existe")
  except peewee.DataError:
    return None
  except peewee.IntegrityError as e:
    cod_error = str(e).rsplit(",")[0].replace("(","")
    #print( str(e))
    if int(cod_error)==1062:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No se puede actualziar el product_measuremento con un codigo de un product_measuremento ya existente")
    if int(cod_error)==1452:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existe la categoria a actualizar")
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Error al actualizar el product_measuremento")

#? Metodo encargado eliminar(actualizar state=false) registros en la tabla product_measurement y agregar registro en la tabal product_measurement_history
def delete(id: int)->bool:
  try:
    produ=search_product_measurement_db("id",id)
    if produ != None:
      produ.state = False
      produ.updated_at= datetime.now()
      produ = product_measurementModel.update(**dict(produ)).where(product_measurementModel.id == id)
      produ.execute()
      return True
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El product_measuremento a actualizar  no existe")
  except peewee.DataError:
    produ = False