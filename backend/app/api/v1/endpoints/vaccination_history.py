from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import uuid
# from app.services.vac_mistral import call_mistral_api, VaccinationData
from app.services.vaccination_client import call_mistral_api, Vaccinations
from app.services.history_client import pdf_client, MedicalHistory
from pydantic import BaseModel

router = APIRouter()

class DigitalizationResponse(BaseModel):
    image_id: str
    certificate_id: str
    vaccinations: Vaccinations

@router.post("/vaccination_certificate/", response_model=DigitalizationResponse)
async def digitalize_certificate(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    image_id = str(uuid.uuid4())
    certificate_id = str(uuid.uuid4())
    
    contents = await file.read()
    mistral_result = await call_mistral_api(contents)
    response = DigitalizationResponse(
        image_id=image_id,
        certificate_id=certificate_id,
        vaccinations=mistral_result
    )
    return response

@router.post("/medicalhistory/", response_model=MedicalHistory)
async def digitalize_certificate_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
    contents = await file.read()
    pdf_result = await pdf_client(contents)
    return pdf_result

