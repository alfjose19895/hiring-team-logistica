from datetime import datetime
from pydantic import BaseModel


def isNone(val):
    if val== None:
      return True;
    else:
      return val
def category_schema_function(category)->dict:
  return {
      "id": category.id,
      "description": category.description,
      "state":  isNone(category.state),
      "created_at":  category.created_at,
      "updated_at":  category.updated_at
  }

def categories_schema_function(categories)->list:
  return [category_schema_function(category) for category in categories]

class Category(BaseModel):
  id: int | None
  description: str
  state: bool | None

class CategoryFull(Category):
  created_at: datetime
  updated_at: datetime