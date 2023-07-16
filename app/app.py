from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schema import ResponseSuccess

def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
def setup_route(app: FastAPI):
    from app.routers import auth
    app.include_router(auth.router)

def create_app() -> FastAPI:
    app = FastAPI()
    
    setup_middleware(app)
    setup_route(app)
    return app
