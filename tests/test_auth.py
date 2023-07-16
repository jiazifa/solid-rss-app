import pytest
from fastapi.testclient import TestClient

from app.app import app

@pytest.fixture
async def async_client():
    host, port = "127.0.0.1", '8000'
    scope = {"client": (host, port)}
    headers = {"X-User-Fingerprint": "Test"}
    async with TestClient(app, scope=scope, headers=headers) as client:
        yield client
        
@pytest.fixture
def client() -> TestClient:
    client = TestClient(app)
    return client

def test_create_user(client: TestClient):
    resp = client.post("/auth/register/", 
                       json={"username": "test@email.com", "password": "test", "confirm_password": "test"})
    assert resp.status_code == 200

def test_work():
    assert 1 == 1