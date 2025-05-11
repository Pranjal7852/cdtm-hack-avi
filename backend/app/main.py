from fastapi import FastAPI
from app.api.v1.endpoints import vaccination_history
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()

app.include_router(
    vaccination_history.router,
    prefix="/api/v1/vaccination",
    tags=["vaccination"]
)