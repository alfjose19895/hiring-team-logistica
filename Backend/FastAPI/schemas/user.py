from pydantic import BaseModel
def user_schema(user)->dict:
  return {
      "id": user.id,
      "email": user.email,
      "password": user.password,
      "state":  user.state
  }
def users_schema(users)->list:
  return [user_schema(user) for user in users]

class User(BaseModel):
  id: int | None
  email:str
  password:str