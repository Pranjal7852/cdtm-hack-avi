from fastapi import FastAPI
from app.api.v1.endpoints import vaccination_history, initial_consultation
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()

app.include_router(
    vaccination_history.router,
    prefix="/api/v1/upload",
    tags=["upload"]
)

app.include_router(
    initial_consultation.router,
    prefix="/api/v1/consultation",
    tags=["consultation"]
)