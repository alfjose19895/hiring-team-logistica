from fastapi import Depends,HTTPException,status, APIRouter
from controllers.category import create, update, delete, get_categories
import schemas.category as CategorySchema


router=APIRouter(prefix="/category",
                 tags=["category"],
                 responses={404:{"mesaje":"No encontrado"}})

@router.post("/",status_code= status.HTTP_201_CREATED)
async def category(category: CategorySchema.Category):
  print( category)
  category= create(category)
  if category!=None:
    return category
  #print(datetime.utcnow() + timedelta(minutes=15))
  #print(datetime.now() + timedelta(minutes=15))
@router.put("/",status_code= status.HTTP_200_OK)
async def category(category: CategorySchema.CategoryUpdte):
  category = update(category)
  if category!=None:
    return category

@router.delete("/{id}",status_code= status.HTTP_200_OK)
async def category(id: int):
  if delete(id):
    return {"mensaje": "Registro Eliminado con Exito"}
  else:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Registro no Actualizado")
@router.get("/",status_code= status.HTTP_201_CREATED)
async def category():
  category= get_categories()
  if category!=None:
    return category