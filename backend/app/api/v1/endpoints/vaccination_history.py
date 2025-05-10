from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import uuid
from app.services.vac_mistral import call_mistral_api, parse_mistral_response, VaccinationData
from pydantic import BaseModel

router = APIRouter()

class DigitalizationResponse(BaseModel):
    image_id: str
    certificate_id: str
    structure_version: str = "1.0.0"
    vaccinations: List[VaccinationData]

@router.post("/digitalize-certificate/", response_model=DigitalizationResponse)
async def digitalize_certificate(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    image_id = str(uuid.uuid4())
    certificate_id = str(uuid.uuid4())
    try:
        contents = await file.read()
        mistral_result = await call_mistral_api(contents)
        vaccinations = parse_mistral_response(mistral_result)
        response = DigitalizationResponse(
            image_id=image_id,
            certificate_id=certificate_id,
            structure_version="1.0.0",
            vaccinations=vaccinations
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process certificate: {str(e)}")
