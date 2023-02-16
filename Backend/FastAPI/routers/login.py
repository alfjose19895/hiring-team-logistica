from fastapi import Depends,HTTPException,status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from controllers.aut import search_user_db
import configparser

config = configparser.ConfigParser()
config.read('config.ini') 

router=APIRouter(prefix="/login",
                 tags=["login"],
                 responses={404:{"mesaje":"No encontrado"}})
                 
oauth2= OAuth2PasswordBearer(tokenUrl="login")
crypt = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/")
async def login(form: OAuth2PasswordRequestForm=Depends()):
  print(form)
  user= search_user_db(form.username)
  #print(datetime.utcnow() + timedelta(minutes=15))
  #print(datetime.now() + timedelta(minutes=15))
  if user!=None:
    if user.state == False:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario esta inactivo")
    if crypt.verify(form.password, user.password):
      access_token  = {"sub": user.email,
                       "exp": datetime.utcnow() + timedelta(minutes=60)}
      return {"access_token": jwt.encode(access_token,config['DEFAULT']['SECRET'],algorithm=config['DEFAULT']['ALGORITHM']), "token_type": "bearer" }
    else:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña incorrecta")
  else:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El usuario no existe")