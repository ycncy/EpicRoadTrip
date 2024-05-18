from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from authentication.router import authentication_router

app = FastAPI(
    title="Authentication Service"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authentication_router)
