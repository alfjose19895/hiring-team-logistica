from fastapi import Depends,HTTPException,status, APIRouter
from controllers.product import create, update, delete,search_product_for_filter
import schemas.product as product_schema


router=APIRouter(prefix="/product",
                 tags=["product"],
                 responses={404:{"mesaje":"No encontrado"}})

@router.post("/",status_code= status.HTTP_201_CREATED)
async def product(product: product_schema.Product):
  print( product)
  product= create(product)
  if product!=None:
    return product
    
@router.put("/",status_code= status.HTTP_200_OK)
async def product(product: product_schema.ProductUpdte):
  product = update(product)
  if product!=None:
    return product

@router.delete("/{id}",status_code= status.HTTP_200_OK)
async def product(id: int):
  if delete(id):
    return {"mensaje": "Registro Eliminado con Exito"}
  else:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Registro no Actualizado")

@router.get("/",status_code= status.HTTP_200_OK)
async def products(filter: product_schema.ProductSearch):
  if filter!=None:
    return search_product_for_filter(filter)