from pydantic import BaseModel


class LoginDTO(BaseModel):
    username: str
    password: str


class CreateUserDTO(BaseModel):
    username: str
    password: str


class UserResponseDTO(BaseModel):
    username: str
