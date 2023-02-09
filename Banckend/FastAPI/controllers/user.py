from fastapi import Depends, FastAPI,HTTPException,status, APIRouter
from models.user import User
from schemas.user import user_schema
import peewee
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from controllers.aut import search_user_db


crypt = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create(user: User):
  try:
    if search_user_db(user.email) == None:
      usert_dict= dict(user)
      usert_dict["password"]=crypt.hash(user.password)
      user = User.create(**usert_dict)
    else:
      raise HTTPException(status_code=409, detail="El usuario ya existe")
  except peewee.DoesNotExist:
    user = None
  return user