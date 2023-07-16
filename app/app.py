from typing import Any, List
from functools import lru_cache
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@lru_cache()
def get_settings():
    from app.setting import Settings
    return Settings()

def get_db() -> Any:
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    

def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
def setup_route(app: FastAPI):
    from app.routers import authorization
    app.include_router(authorization.router)

def setup_openapi(app: FastAPI):
    ALLOWED_DOCS_ENV: List[str] = ["dev"]
    env = get_settings().ENVIRONMENT
    
    if env not in ALLOWED_DOCS_ENV:
        app.openapi_url = None

def create_db_if_needed(app: FastAPI):
    from app import models
    from app.database import engine, Base
    Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    app = FastAPI()

    setup_middleware(app)
    setup_route(app)
    setup_openapi(app)
    create_db_if_needed(app)


    @app.get("/health")
    async def health():
        return {"status": "ok"}
    return app