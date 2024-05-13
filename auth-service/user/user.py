from uuid import UUID, uuid4

from passlib.context import CryptContext
from sqlalchemy import String, Column
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from authentication.dto import CreateUserDTO, LoginDTO
from database.engine import Database


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'user'
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    username: Mapped[str] = Column(String(50), unique=True, nullable=False)
    password: Mapped[str] = Column(String(255), nullable=False)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

engine = Database().get_engine()
Base.metadata.create_all(engine)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user_by_id(user_id: UUID):
    with Database().get_session() as session:
        return session.query(User).filter(User.id == user_id).first()


def authenticate_user(login_dto: LoginDTO) -> User | None:
    with Database().get_session() as session:
        user = session.query(User).filter(User.username == login_dto.username).first()
        if not user:
            return None
        if not verify_password(login_dto.password, user.password):
            return None
        return user


def create_user(create_user_dto: CreateUserDTO) -> User:
    with Database().get_session() as session:
        encrypted_password = get_password_hash(create_user_dto.password)
        new_user = User(
            username=create_user_dto.username,
            password=encrypted_password
        )
        session.add(new_user)
        session.commit()

        return new_user
