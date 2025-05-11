import base64
import os
import json
from typing import List
from pydantic import BaseModel, Field
from langchain.chat_models import init_chat_model
from langchain.schema import SystemMessage, HumanMessage

class VaccinationData(BaseModel):
    date: str = Field(
        ...,
        description="Date of vaccination in ISO format (YYYY-MM-DD) or as found in the document.",
        example="2024-01-01"
    )
    vaccine_type: List[str] = Field(
        ...,
        description="List of vaccine names/types administered in this entry.",
        example=["COVID-19", "Pfizer-BioNTech"]
    )
    purpose: List[str] = Field(
        ...,
        description="List of purposes or reasons for the vaccination (e.g., 'booster', 'primary immunization').",
        example=["Immunization", "Booster"]
    )
    confidence_score: float = Field(
        ...,
        description="Model's confidence in the extraction for this entry, between 0 and 1.",
        example=0.98
    )

class Vaccinations(BaseModel):
    vaccinations: List[VaccinationData] = Field(
        ...,
        description="List of all extracted vaccination entries from the document."
    )

MODEL = "gpt-4o-mini"

SYS_PROMPT = (
    "Extract all vaccination entries from this document and return them as a JSON list of objects "
    "with the following fields: date, vaccine_type, purpose, confidence_score. "
    f"Your output should be an instance of a JSON object following this schema: {Vaccinations.model_json_schema()}"
    "Example Response: [{\"date\": \"2024-01-01\", \"vaccine_type\": \"COVID-19\", \"purpose\": [\"Immunization\"], \"confidence_score\": 0.98}]"
)

async def call_mistral_api(image_bytes: bytes) -> Vaccinations:
    base64_image = base64.b64encode(image_bytes).decode('utf-8')
    data_url = f"data:image/jpeg;base64,{base64_image}"

    # Set up LangChain's ChatOpenAI for Mistral
    llm = init_chat_model(MODEL, model_provider="openai", temperature=0)

    structured_llm = llm.with_structured_output(Vaccinations)

    # Compose messages
    messages = [
        SystemMessage(content=SYS_PROMPT),
        HumanMessage(content=[
        {"type": "text", "text": "Analyse this image and extract the vaccination information into JSON format"},
        {
            "type": "image",
            "source_type": "base64",
            "data": base64_image,
            "mime_type": "image/jpeg",
        },
    ],)
    ]

    # Call the model
    return structured_llm.invoke(messages)
