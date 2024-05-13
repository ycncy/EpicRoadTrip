from uuid import UUID

import requests
from fastapi import APIRouter, HTTPException, Depends
from fastapi.params import Param

from middleware.jwt_bearer import JWTBearer
from trip.dto import TripStopResponseDTO, CreateTripStopDTO, PatchTripDTO

trip_stop_router = APIRouter(
    prefix="/trip-stops",
    tags=["Trip Stop"],
)

TRIP_SERVICE_URL = "http://host.docker.internal:8080/trip-stops"


@trip_stop_router.get("/{trip_stop_id}", dependencies=[Depends(JWTBearer())], response_model=TripStopResponseDTO)
async def get_trip_stop(
        trip_stop_id: int
) -> TripStopResponseDTO:
    trip_stop_response = requests.get(f"{TRIP_SERVICE_URL}/{trip_stop_id}")

    if trip_stop_response.status_code != 200:
        raise HTTPException(status_code=trip_stop_response.status_code, detail=trip_stop_response.json().get("message"))

    return TripStopResponseDTO.from_json(trip_stop_response.json())


@trip_stop_router.post("", dependencies=[Depends(JWTBearer())], response_model=TripStopResponseDTO)
async def create_trip_stop(
        create_trip_stop_dto: CreateTripStopDTO,
        trip_id: UUID = Param(..., example="550e8400-e29b-41d4-a716-446655440000")
) -> TripStopResponseDTO:
    trip_stop_response = requests.post(
        f"{TRIP_SERVICE_URL}",
        params={
          "trip-id": str(trip_id)
        },
        json=create_trip_stop_dto.dict()
    )

    if trip_stop_response.status_code != 201:
        raise HTTPException(status_code=trip_stop_response.status_code, detail=trip_stop_response.json().get("message"))

    return TripStopResponseDTO.from_json(trip_stop_response.json())


@trip_stop_router.patch("/{trip_stop_id}", dependencies=[Depends(JWTBearer())], response_model=TripStopResponseDTO)
async def patch_trip_stop(
        trip_stop_id: int,
        patch_trip_stop_dto: PatchTripDTO
) -> TripStopResponseDTO:
    trip_stop_response = requests.patch(
        f"{TRIP_SERVICE_URL}/{trip_stop_id}",
        json=patch_trip_stop_dto.dict()
    )

    if trip_stop_response.status_code != 200:
        raise HTTPException(status_code=trip_stop_response.status_code, detail=trip_stop_response.json().get("message"))

    return TripStopResponseDTO.from_json(trip_stop_response.json())


@trip_stop_router.delete("/{trip_stop_id}", dependencies=[Depends(JWTBearer())])
async def delete_trip_stop(
        trip_stop_id: int
):
    trip_stop_response = requests.delete(
        f"{TRIP_SERVICE_URL}/{trip_stop_id}"
    )

    if trip_stop_response.status_code != 200:
        raise HTTPException(status_code=trip_stop_response.status_code, detail=trip_stop_response.json().get("message"))

    return trip_stop_response
