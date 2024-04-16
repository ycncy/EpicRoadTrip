from fastapi import FastAPI

from place.router import router

app = FastAPI()

app.include_router(router)
