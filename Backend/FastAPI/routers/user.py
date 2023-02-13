from fastapi import Depends,HTTPException,status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from schemas.user import User
from controllers.user import create

import configparser

config = configparser.ConfigParser()
config.read('config.ini') 

router=APIRouter(prefix="/user",
                 tags=["user"],
                 responses={404:{"mesaje":"No encontrado"}})
                 
oauth2= OAuth2PasswordBearer(tokenUrl="/login")
crypt = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def get_current_user(token: str = Depends(oauth2)):
    print(user.email)
    if user == None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.post("/",status_code= status.HTTP_201_CREATED)
async def user(user: User):
  print( user)
  user= create(user)
  if user!=None:
    return user
  #print(datetime.utcnow() + timedelta(minutes=15))
  #print(datetime.now() + timedelta(minutes=15))