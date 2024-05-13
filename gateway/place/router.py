from typing import List

import requests
from fastapi import APIRouter, Depends, HTTPException

from middleware.jwt_bearer import JWTBearer
from place.dto import PlaceType, PlaceResponseDTO

place_router = APIRouter(
    prefix="/places",
    tags=["Places"],
)

PLACE_SERVICE_URL = "http://host.docker.internal:5002/places"


@place_router.get("", dependencies=[Depends(JWTBearer())])
def get_places(
        place_type: PlaceType,
        latitude: float,
        longitude: float,
        radius: float
) -> List[PlaceResponseDTO]:
    trip_response = requests.get(
        f"{PLACE_SERVICE_URL}",
        params={
            "place_type": place_type.value,
            "latitude": latitude,
            "longitude": longitude,
            "radius": radius
        }
    )

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return [PlaceResponseDTO.from_json(trip) for trip in trip_response.json()]