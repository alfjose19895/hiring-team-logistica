import peewee
from fastapi import Depends, FastAPI,HTTPException,status, APIRouter
from models.user import User
from schemas.user import user_schema


def search_user_db(useremail: str):
  try:
    user = User.get(User.email==useremail)
    user = User(**user_schema(user))
  except peewee.DoesNotExist:
    user = None
  return user