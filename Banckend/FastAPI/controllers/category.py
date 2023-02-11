from datetime import datetime
import schemas.category as CategorySchema
from models.category import Category as CategoryModel
from fastapi import HTTPException,status
from operator import attrgetter
import peewee


def search_category_db(key: str, value)->CategorySchema.CategoryFull:
  try:
    category = CategoryModel.get(attrgetter(key)(CategoryModel)==value)
    category = CategorySchema.CategoryFull(**CategorySchema.category_schema_function(category))
  except peewee.DoesNotExist:
    category = None
  return category

def create(category: CategorySchema):
  try:
    if search_category_db("description",category.description) == None:
      category= CategorySchema.Category(**dict(category))
      category_dict= dict(category)
      category = CategoryModel.create(**category_dict)
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El categoria ya existe")
  except peewee.DoesNotExist:
    category = None
  return category

def update(category: CategorySchema.CategoryUpdte):
  try:
    catego=search_category_db("id",category.id)
    print(type(catego))
    if type(catego) == CategorySchema.CategoryFull:
      catego.description= category.description
      catego.state= category.state
      catego.updated_at= datetime.now()   
      catego = CategoryModel.update(**dict(catego)).where(CategoryModel.id == category.id)
      catego.execute()
      return category
  except peewee.IntegrityError as e:
    cod_error = str(e).rsplit(",")[0].replace("(","")
    print( str(e))
    if int(cod_error)==1062:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No se puede actualziar el categoria con una descripcion de un categoria ya existente")
    if int(cod_error)==1452:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existe la categoria a actualizar")
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Error al actualizar el categoria")

def delete(id: int)->bool:
  try:
    catego=search_category_db("id",id)
    if type(catego) == CategorySchema.CategoryFull:
      catego.state= False
      catego.updated_at= datetime.now()
      catego = CategoryModel.update(**dict(catego)).where(CategoryModel.id == id)
      catego.execute()
      return True
    return False
  except peewee.DataError:
    catego = False