from fastapi import FastAPI

from authentication.router import authentication_router

app = FastAPI(
    title="Authentication Service"
)

app.include_router(authentication_router)
