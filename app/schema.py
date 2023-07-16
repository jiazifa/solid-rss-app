from typing import Generic, Optional, TypeVar
from pydantic import BaseModel, Field


T = TypeVar("T", dict, list, BaseModel)

class ResponseSuccess(BaseModel, Generic[T]):
    data: Optional[T]
    code: int = Field(default=200)
    message: Optional[str] = Field(default="")

class ResponseError(BaseModel, Generic[T]):
    data: Optional[T]
    code: int = Field(default=400)
    message: Optional[str] = Field(default="")