from fastapi import FastAPI, HTTPException,status
from routers import login,user,category,product
#from fastapi.staticfiles import StaticFiles #* para trabajar con archivos

app = FastAPI()
app.include_router(login.router)
app.include_router(user.router)
app.include_router(category.router)
app.include_router(product.router)

#app.mount("/static",StaticFiles(directory="static"), name="static")  #* directory->debe ser el mismo nombre del directorio
