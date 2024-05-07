from fastapi import APIRouter, HTTPException

from uuid import UUID
from authentication.dto import LoginDTO, CreateUserDTO, UserResponseDTO
from jwt_handler.handler import sign_jwt_access_token
from jwt_handler.response_model import BaseJwtResponse
from user.user import authenticate_user, create_user, get_user_by_id

authentication_router = APIRouter(
    prefix="/authentication",
    tags=["Authentication"],
)


@authentication_router.post("/login", response_model=BaseJwtResponse)
def login(login_dto: LoginDTO):
    user = authenticate_user(login_dto)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid username"
        )
    return sign_jwt_access_token(str(user.id))


@authentication_router.post("/register")
def register(create_user_dto: CreateUserDTO) -> UserResponseDTO:
    user = create_user(create_user_dto)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    else:
        return UserResponseDTO(
            username=user.username
        )


@authentication_router.get("/users/{user_id}", response_model=UserResponseDTO)
def get_user(
        user_id: UUID
) -> UserResponseDTO:
    user = get_user_by_id(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    else:
        return UserResponseDTO(
            username=user.username
        )
