from typing import Optional

from pydantic import BaseModel, Field

from core.position import Position


class TripResponseDTO(BaseModel):
    id: str = Field(example="550e8400-e29b-41d4-a716-446655440000")
    user_id: str = Field(example="2c0dcffaa7e3412492b79fd2f8a5f298")
    title: str = Field(example="Paris-Marseille")
    description: Optional[str] = Field(default=None, example="Voyage été 2024")
    startPosition: Position
    endPosition: Position
    startDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")
    endDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")
    createdAt: str

    @classmethod
    def from_json(cls, data_json: dict) -> 'TripResponseDTO':
        start_position = Position(latitude=data_json["startPosition"]["latitude"],
                                  longitude=data_json["startPosition"]["longitude"])
        end_position = Position(latitude=data_json["endPosition"]["latitude"],
                                longitude=data_json["endPosition"]["longitude"])

        return cls(
            id=data_json["id"],
            user_id=data_json["userId"],
            title=data_json["title"],
            description=data_json["description"],
            startPosition=start_position,
            endPosition=end_position,
            startDatetime=data_json["startDatetime"],
            endDatetime=data_json["endDatetime"],
            createdAt=data_json["createdAt"]
        )


class CreateTripDTO(BaseModel):
    title: str = Field(example="Paris-Marseille")
    userId: str = Field(example="2c0dcffaa7e3412492b79fd2f8a5f298")
    description: Optional[str] = Field(default=None, example="Voyage été 2024")
    startPosition: Position
    endPosition: Position
    startDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")
    endDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")


class PatchTripDTO(BaseModel):
    title: str = Field(default=None, example="Paris-Marseille")
    userId: str = Field(example="2c0dcffaa7e3412492b79fd2f8a5f298")
    description: Optional[str] = Field(default=None, example="Voyage été 2024")
    startPosition: Position = None
    endPosition: Position = None
    startDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")
    endDatetime: Optional[str] = Field(default=None, example="2024-05-07T12:06:15.879Z")


class CreateTripStopDTO(BaseModel):
    google_id: str = Field(example="ChIJ60tzEQDByRIRc5rkNszNXpY")
    type: str = Field(example="HOTEL")
    position: Position
    name: str = Field(example="Hotel X")
    description: Optional[str] = Field(default=None, example="Hotel près de la mer")


class PatchTripStopDTO(BaseModel):
    google_id: str = Field(example="ChIJ60tzEQDByRIRc5rkNszNXpY")
    type: Optional[str] = Field(default=None, example="HOTEL")
    position: Optional[Position] = None
    name: Optional[str] = Field(default=None, example="Hotel X")
    description: Optional[str] = Field(default=None, example="Hotel près de la mer")


class TripStopResponseDTO(BaseModel):
    id: int = Field(example=1)
    tripId: str = Field(example="550e8400-e29b-41d4-a716-446655440000")
    googleId: Optional[str] = Field(default=None, example="ChIJ60tzEQDByRIRc5rkNszNXpY")
    type: str = Field(example="HOTEL")
    position: Position
    name: str = Field(example="Hotel X")
    description: str = Field(example="Hotel près de la mer")
    createdAt: str = Field(example="2024-05-07T12:06:15.879Z")

    @classmethod
    def from_json(cls, data_dict: dict) -> 'TripStopResponseDTO':
        position_instance = Position(latitude=data_dict["position"]["latitude"],
                                     longitude=data_dict["position"]["longitude"])

        print(data_dict)
        return cls(
            id=data_dict["id"],
            tripId=data_dict["tripId"],
            googleId=data_dict.get("googleId", None),
            type=data_dict["type"],
            position=position_instance,
            name=data_dict["name"],
            description=data_dict.get("description"),
            createdAt=data_dict["createdAt"]
        )
