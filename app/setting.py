from typing import Set, Optional
import os
from pydantic_settings import BaseSettings
from pydantic import  AnyUrl, Field

def get_sqlite_url_from_env() -> Optional[str]:
    return "sqlite:///./db.sqlite3"
    # return os.getenv("SQLALCHEMY_DATABASE_URL") or 

class Settings(BaseSettings):
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
    
    DATABASE_URL: str = Field(default_factory=get_sqlite_url_from_env)
    
    ALLOWED_CORS_ORIGINS: Set[AnyUrl] = Field(default_factory=set)
    SECRET_KEY: str = Field(default="secret")
    ALGORITHM: str = Field("HS256")
    ENVIRONMENT: str = Field(default="dev")