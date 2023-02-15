from fastapi import FastAPI, HTTPException,status
from routers import login,user,category,product,product_measurement
#from fastapi.staticfiles import StaticFiles #* para trabajar con archivos
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]
app = FastAPI()
app.include_router(login.router)
app.include_router(user.router)
app.include_router(category.router)
app.include_router(product.router)
app.include_router(product_measurement.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#apython -m uvicorn api:app  --reload --port 1615
