import os
from typing import Optional, Dict, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from contextlib import contextmanager

from dotenv import load_dotenv

load_dotenv()


def mysql_backend_primary():
    return "mysql+mysqlconnector://{}:{}@{}/{}".format(
        os.environ.get("MYSQL_USER"),
        os.environ.get("MYSQL_PASSWORD"),
        os.environ.get("MYSQL_SERVER"),
        os.environ.get("MYSQL_SCHEMA"),
    )


def mysql_backend_secondary():
    return "mysql+mysqlconnector://{}:{}@{}/{}".format(
        os.environ.get("MYSQL_USER"),
        os.environ.get("MYSQL_PASSWORD"),
        os.environ.get("MYSQL_SECONDARY_SERVER"),
        os.environ.get("MYSQL_SCHEMA"),
    )


backend_url_primary = mysql_backend_primary
backend_url_secondary = mysql_backend_secondary


class Database:
    _instance = None

    def __new__(cls, connexion="primary", connect_args: Optional[Dict] = None):
        if cls._instance is None:
            cls._instance = object.__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, connexion="primary", connect_args: Optional[Dict] = None):
        if self._initialized and self.connexion == connexion:
            return
        self._initialized: bool = True
        self.connexion: str = connexion
        self.engine = self.get_engine(connect_args=connect_args)
        self.Session = scoped_session(
            sessionmaker(bind=self.engine, expire_on_commit=False)
        )

    def get_engine(self, connect_args: Optional[Dict] = None):
        pool_size = int(os.environ.get("MYSQL_POOLSIZE", 5))

        pool_recycle = int(os.environ.get("MYSQL_POOL_RECYCLE", 3600))

        max_overflow = int(os.environ.get("MYSQL_MAX_OVERFLOW", 0))

        connect_args = connect_args or {}

        if (
            self.connexion == "secondary"
            and os.environ.get("MYSQL_SECONDARY_SERVER") is not None
        ):
            connection = backend_url_secondary()
        else:
            self.connexion = "primary"
            connection = backend_url_primary()

        return create_engine(
            connection,
            pool_recycle=pool_recycle,
            pool_size=pool_size,
            connect_args=connect_args,
            max_overflow=max_overflow,
        )

    @contextmanager
    def get_session(self) -> Generator[scoped_session, None, None]:
        session = self.Session()
        try:
            yield session
            session.commit()
        except:  # noqa
            session.rollback()
            raise
        finally:
            session.close()

    def close_session(self):
        self.Session.remove()

    def dispose_connexion(self):
        self.engine.dispose()

    def call_procedure(self, name, parameters):
        connection = self.engine.raw_connection()
        try:
            cursor = connection.cursor()
            cursor.callproc(name, parameters)
            results = [r.fetchall() for r in cursor.stored_results()]
            cursor.close()
            connection.commit()
            return results
        finally:
            connection.close()
