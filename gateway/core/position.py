from pydantic import BaseModel, Field


class Position(BaseModel):
    latitude: float = Field(example=34.000)
    longitude: float = Field(example=34.000)
