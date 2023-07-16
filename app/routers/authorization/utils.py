from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from app.setting import Settings

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None, settings: Optional[Settings] = None) -> str:
    """
    Generates an access token using the provided data.

    Parameters:
        data (dict): The data to be encoded in the access token.
        expires_delta (Optional[timedelta]): Optional expiration time for the access token.
            If not provided, the token will expire after 15 minutes.
        settings (Optional[Settings]): Optional settings for encoding the access token.

    Returns:
        str: The encoded access token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None, settings: Optional[Settings] = None) -> str:
    """
    Generates a refresh token using the provided data.

    Parameters:
        data (dict): The data to be encoded in the refresh token.
        expires_delta (Optional[timedelta]): Optional expiration time for the refresh token.
            If not provided, the token will expire after 7 days.
        settings (Optional[Settings]): Optional settings for encoding the refresh token.

    Returns:
        str: The encoded refresh token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
