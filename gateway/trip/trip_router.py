from typing import List
from uuid import UUID

import requests
from fastapi import APIRouter, HTTPException, Depends
from fastapi.params import Path

from middleware.jwt_bearer import JWTBearer
from trip.dto import TripResponseDTO, CreateTripDTO, PatchTripDTO, TripStopResponseDTO

trip_router = APIRouter(
    prefix="/trips",
    tags=["Trip"],
)

TRIP_SERVICE_URL = "http://host.docker.internal:8080/trips"


@trip_router.get("/{trip_id}/stops", response_model=List[TripStopResponseDTO])
async def get_stops(
        trip_id: UUID = Path(..., example="550e8400-e29b-41d4-a716-446655440000")
) -> List[TripStopResponseDTO]:
    trip_response = requests.get(
        f"{TRIP_SERVICE_URL}/{trip_id}/stops"
    )

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return [TripStopResponseDTO.from_json(trip) for trip in trip_response.json()]


@trip_router.get("/{trip_id}", response_model=TripResponseDTO)
async def get_trip(
        trip_id: UUID = Path(..., example="550e8400-e29b-41d4-a716-446655440000")
) -> TripResponseDTO:
    trip_response = requests.get(f"{TRIP_SERVICE_URL}/{trip_id}")

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return TripResponseDTO.from_json(trip_response.json())


@trip_router.get("/users/{user_id}", dependencies=[Depends(JWTBearer())], response_model=List[TripResponseDTO])
async def get_trips_by_user_id(
        user_id: str = Path(..., example="2c0dcffaa7e3412492b79fd2f8a5f298")
):
    trip_response = requests.get(f"{TRIP_SERVICE_URL}/users/{user_id}")

    print(trip_response.json())

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return [TripResponseDTO.from_json(trip) for trip in trip_response.json()]


@trip_router.post("", dependencies=[Depends(JWTBearer())], response_model=TripResponseDTO)
async def create_trip(
        create_trip_dto: CreateTripDTO
) -> TripResponseDTO:
    trip_response = requests.post(
        f"{TRIP_SERVICE_URL}", json=create_trip_dto.dict()
    )

    if trip_response.status_code != 201:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return TripResponseDTO.from_json(trip_response.json())


@trip_router.delete("/{trip_id}", dependencies=[Depends(JWTBearer())])
async def delete_trip(
        trip_id: UUID = Path(..., example="550e8400-e29b-41d4-a716-446655440000")
):
    trip_response = requests.delete(
        f"{TRIP_SERVICE_URL}/{trip_id}"
    )

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return trip_response


@trip_router.patch("/{trip_id}", dependencies=[Depends(JWTBearer())], response_model=TripResponseDTO)
async def update_trip(
        update_trip_dto: PatchTripDTO,
        trip_id: UUID = Path(..., example="550e8400-e29b-41d4-a716-446655440000")
) -> TripResponseDTO:
    trip_response = requests.patch(
        f"{TRIP_SERVICE_URL}/{trip_id}",
        json=update_trip_dto.dict()
    )

    if trip_response.status_code != 200:
        raise HTTPException(status_code=trip_response.status_code, detail=trip_response.json().get("message"))

    return TripResponseDTO.from_json(trip_response.json())
