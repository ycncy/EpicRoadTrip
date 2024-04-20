from pydantic import BaseModel


class BaseJwtResponse(BaseModel):
    user_id: int
    access_token: str