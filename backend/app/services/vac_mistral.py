import os
from typing import List

import httpx
from pydantic import BaseModel
from mistralai import Mistral
import base64

MISTRAL_API_URL = "https://api.mistral.ai/v1/your-endpoint"  # Replace with actual endpoint
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

MODEL = "mistral-small-latest"

class VaccinationData(BaseModel):
    date: str
    vaccine_type: str
    purpose: List[list]
    confidence_score: float

class Vaccinations(BaseModel):
    vaccinations: List[VaccinationData]

def parse_mistral_response(data: dict) -> List[VaccinationData]:
    vaccinations = []
    for entry in data.get("vaccinations", []):
        vaccinations.append(VaccinationData(
            date=entry.get("date", "Unknown"),
            vaccine_type=entry.get("vaccine_type", "Unknown"),
            purpose=entry.get("purpose", []),
            confidence_score=entry.get("confidence_score", 0.0)
        ))
    return vaccinations

async def call_mistral_api(image_bytes: bytes) -> dict:
    api_key = os.environ["MISTRAL_API_KEY"]
    client = Mistral(api_key=api_key)
    # Encode image to base64
    base64_image = base64.b64encode(image_bytes).decode("utf-8")
    # Compose data URL (adjust MIME type if needed)
    data_url = f"data:image/png;base64,{base64_image}"
    # Call the OCR endpoint
    ocr_response = client.ocr.process(
        model="mistral-ocr-latest",
        document={
            "type": "image_url",
            "image_url": data_url
        }
    )
    return ocr_response
