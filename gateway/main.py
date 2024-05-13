from fastapi import FastAPI

from place.router import place_router
from trip.trip_router import trip_router
from trip.trip_stop_router import trip_stop_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Epic Road Trip",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trip_router)
app.include_router(trip_stop_router)
app.include_router(place_router)