import os
import time

import jwt
from jwt_handler.response_model import BaseJwtResponse

JWT_SECRET = os.environ.get("JWT_SECRET")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM")


def sign_jwt_access_token(user_id: int) -> BaseJwtResponse:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 600
    }
    access_token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return BaseJwtResponse(
        user_id=user_id,
        access_token=access_token
    )


def decode_jwt_token(access_token: str) -> dict:
    try:
        decoded_token = jwt.decode(access_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}
