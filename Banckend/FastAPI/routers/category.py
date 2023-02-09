from fastapi import Depends,HTTPException,status, APIRouter
from controllers.category import create, update
from schemas.category import Category as CategorySchema


router=APIRouter(prefix="/category",
                 tags=["category"],
                 responses={404:{"mesaje":"No encontrado"}})

@router.post("/",status_code= status.HTTP_201_CREATED)
async def category(category: CategorySchema):
  print( category)
  category= create(category)
  if category!=None:
    return category
  #print(datetime.utcnow() + timedelta(minutes=15))
  #print(datetime.now() + timedelta(minutes=15))
@router.put("/",status_code= status.HTTP_201_CREATED)
async def category(category: CategorySchema):
  category= update(category)
  if category!=None:
    return category