from datetime import datetime
import schemas.category as CategorySchema
from models.category import Category as CategoryModel
from fastapi import HTTPException,status
from operator import attrgetter
import peewee


def search_description_category_db(description: str)->CategorySchema.CategoryFull:
  try:
    category = CategoryModel.get(CategoryModel.description==description)
    category = CategorySchema(**CategorySchema.category_schema_function(category))
  except peewee.DoesNotExist:
    category = None
  return category

def search_category_db(key: str, value)->CategorySchema.CategoryFull:
  try:
    category = CategoryModel.get(attrgetter(key)(CategoryModel)==value)
    category = CategorySchema.CategoryFull(**CategorySchema.category_schema_function(category))
  except peewee.DoesNotExist:
    category = None
  return category

def create(category: CategorySchema):
  try:
    if category.state==None:
      category.state=True
    if search_description_category_db(category.description) == None:
      category_dict= dict(category)
      del category_dict["id"]
      category = CategoryModel.create(**category_dict)
    else:
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El categoria ya existe")
  except peewee.DoesNotExist:
    category = None
  return category

def update(category: CategorySchema.CategoryUpdte):
  try:
    catego=search_category_db("id",category.id)
    if type(catego) == CategorySchema.CategoryFull:
      catego.description= category.description
      catego.state= category.state
      catego.updated_at= datetime.now()
      '''
      if catego == None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existe el registro que desea actualizar")
      if catego == category:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No existe que actualizar")
      catego_dict= category_schema_function(catego)
      print(catego_dict)
      catego_dict=dict(catego_dict)
      print(catego_dict)
      catego = CategoryModel.update(catego_dict )
      print(catego)
      return catego##CategorySchema(**category_schema_function(catego))'''      
      catego = CategoryModel.update(**dict(catego)).where(CategoryModel.id == category.id)
      catego.execute()
      return category
  except peewee.DoesNotExist:
    category = None

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