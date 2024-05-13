import os

import requests
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from typing import Optional

JWT_SECRET = os.environ.get("JWT_SECRET")


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    async def verify_jwt(self, jwtoken: str) -> Optional[dict]:
        try:
            payload = jwt.decode(jwtoken, JWT_SECRET, algorithms=["HS256"])
            user_id = payload.get("user_id")
            if not user_id or not fetch_user(user_id):
                raise HTTPException(status_code=403, detail="Invalid credentials")
            return payload
        except JWTError:
            raise HTTPException(status_code=403, detail="Invalid token or expired token")


def fetch_user(user_id: str):
    user = requests.get(f"http://host.docker.internal:5001/user/{user_id}")
    return user.json()
