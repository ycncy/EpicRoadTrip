from enum import Enum

from pydantic import BaseModel, Field


class PlaceType(Enum):
    CAR_UTILITIES = 'CAR_UTILITIES'
    CULTURE = 'CULTURE'
    ENTERTAINMENT = 'ENTERTAINMENT'
    FINANCE = 'FINANCE'
    BAR = 'BAR'
    RESTAURANT = 'RESTAURANT'
    ADMINISTRATIVE_SERVICE = 'ADMINISTRATIVE_SERVICE'
    HEALTH = 'HEALTH'
    ACCOMMODATION = 'ACCOMMODATION'
    SERVICES = 'SERVICES'
    SHOPPING = 'SHOPPING'
    SPORT = 'SPORT'
    TRANSPORT = 'TRANSPORT'


class Location(BaseModel):
    longitude: float = Field(example=34.000)
    latitude: float = Field(example=34.000)


class GetPlaceDTO(BaseModel):
    place_type: PlaceType
    latitude: float
    longitude: float
    radius: float


class PlaceResponseDTO(BaseModel):
    address: str | None = Field(default=None, example="82 Rue de la république")
    location: Location | None
    google_maps_url: str | None = Field(default=None, example="https://maps.googleapis.com/maps/api")
    name: str | None = Field(default=None, example="Restaurant République")
    phone_number: str | None = Field(default=None, example="+33 12 39 23 90")
    website_url: str | None = Field(default=None, example="https://restaurant.fr")
    summary: str | None = Field(default=None, example="Restaurant gastronomique")
    image_url: str | None = Field(default=None, example="https://imgur.com")
    rating: float | None = Field(default=None, example=3.4)

    @classmethod
    def from_json(cls, json_dict: dict) -> 'PlaceResponseDTO':
        return cls(
            address=json_dict['address'],
            location=json_dict['location'],
            google_maps_url=json_dict['google_maps_url'],
            name=json_dict['name'],
            phone_number=json_dict['phone_number'],
            website_url=json_dict['website_url'],
            summary=json_dict['summary'],
            image_url=json_dict['image_url'],
            rating=json_dict['rating']
        )
