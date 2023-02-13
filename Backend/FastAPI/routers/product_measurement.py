from fastapi import HTTPException,status, APIRouter
from controllers.product_measurement import create, update, delete
import schemas.product_measurement as product_measurement_schema


router=APIRouter(prefix="/product_measurement",
                 tags=["product_measurement"],
                 responses={404:{"mesaje":"No encontrado"}})

@router.post("/",status_code= status.HTTP_201_CREATED)
async def product_measurement(product_measurement: product_measurement_schema.ProductMeasurement):
  print( product_measurement)
  product_measurement= create(product_measurement)
  if product_measurement!=None:
    return product_measurement
    
@router.put("/",status_code= status.HTTP_200_OK)
async def product_measurement(product_measurement: product_measurement_schema.ProductMeasurement):
  product_measurement = update(product_measurement)
  if product_measurement!=None:
    return product_measurement

@router.delete("/{id}",status_code= status.HTTP_200_OK)
async def product_measurement(id: int):
  if delete(id):
    return {"mensaje": "Registro Eliminado con Exito"}
  else:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Registro no Actualizado")