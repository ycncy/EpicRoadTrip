from fastapi import FastAPI

from place.router import router

app = FastAPI(
    title="Place Service",
    description="Service to fetch data from Google Places API"
)

app.include_router(router)
