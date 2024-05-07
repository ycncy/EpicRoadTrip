from fastapi import FastAPI

from place.router import place_router
from trip.trip_router import trip_router
from trip.trip_stop_router import trip_stop_router

app = FastAPI(
    title="Epic Road Trip"
)

app.include_router(trip_router)
app.include_router(trip_stop_router)
app.include_router(place_router)