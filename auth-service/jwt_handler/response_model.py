from pydantic import BaseModel


class BaseJwtResponse(BaseModel):
    user_id: str
    access_token: str