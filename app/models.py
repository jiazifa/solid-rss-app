from typing import Optional

from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, model_validator
from sqlalchemy import Column, Integer, Sequence, String, DateTime
from app.database import Base

class User(Base):
    
    __tablename__ = "user"
    
    user_id: int = Column(
        Integer, 
        Sequence(start=1, increment=1, name="account_id_sep"), 
        primary_key=True, 
        autoincrement=True
    )
    
    uuid: str = Column(String(16), nullable=False, unique=True)
    username: Optional[str] = Column(String(50), nullable=True)
    email: str = Column(String(50), nullable=False)
    hashd_password: str = Column(String(50), nullable=False)
    create_at: DateTime = Column(DateTime, default=datetime.now, comment="创建时间")
    update_at: DateTime = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    