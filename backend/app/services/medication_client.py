import os
import json
from typing import List
from pydantic import BaseModel, Field
from mistralai import Mistral

class MedicationEntry(BaseModel):
    name: str = Field(
        ...,
        description="The full name of the medication as written on the package, prescription, or document.",
        example="Metformin Hydrochloride"
    )
    dosage: str = Field(
        None,
        description="The dosage strength and form of the medication, including units (e.g., '500 mg tablet', '20 mg/ml solution').",
        example="500 mg tablet"
    )
    frequency: str = Field(
        None,
        description="How often the medication should be taken (e.g., 'twice daily', 'once every morning').",
        example="twice daily"
    )
    route: str = Field(
        None,
        description="The route of administration (e.g., 'oral', 'intravenous', 'topical').",
        example="oral"
    )
    prescribing_doctor: str = Field(
        None,
        description="Name of the prescribing doctor, if available.",
        example="Dr. Anna Schmidt"
    )
    start_date: str = Field(
        None,
        description="Date when the medication was started, in ISO format (YYYY-MM-DD) or as found in the document.",
        example="2024-05-01"
    )
    end_date: str = Field(
        None,
        description="Date when the medication was stopped or is planned to stop, in ISO format (YYYY-MM-DD) or as found in the document.",
        example="2024-06-01"
    )
    notes: str = Field(
        None,
        description="Any additional notes or instructions related to the medication.",
        example="Take with food. Do not skip doses."
    )

class CurrentMedications(BaseModel):
    medications: List[MedicationEntry] = Field(
        ...,
        description="A list of all current medications extracted from the image or document."
    )

MODEL = "mistral-small-latest"

SYS_PROMPT = (
    "You are a medical assistant AI. You will receive an image or PDF document containing information about a patient's current medications. "
    "Your task is to extract all current medications the patient is taking. "
    "For each medication, provide the following fields as accurately as possible: "
    "- name: The full name of the medication as written on the package, prescription, or document. "
    "- dosage: The dosage strength and form of the medication, including units (e.g., '500 mg tablet', '20 mg/ml solution'). "
    "- frequency: How often the medication should be taken (e.g., 'twice daily', 'once every morning'). "
    "- route: The route of administration (e.g., 'oral', 'intravenous', 'topical'). "
    "- prescribing_doctor: Name of the prescribing doctor, if available. "
    "- start_date: Date when the medication was started, in ISO format (YYYY-MM-DD) or as found in the document. "
    "- end_date: Date when the medication was stopped or is planned to stop, in ISO format (YYYY-MM-DD) or as found in the document. "
    "- notes: Any additional notes or instructions related to the medication. "
    "If a field is missing in the document, leave it empty or use null. "
    "Return your answer as a JSON object with a single key 'medications', which contains a list of entries, each following this schema: "
    f"{CurrentMedications.model_json_schema()} "
    "Example Response: {\"medications\": ["
    "{\"name\": \"Metformin Hydrochloride\", \"dosage\": \"500 mg tablet\", \"frequency\": \"twice daily\", \"route\": \"oral\", \"prescribing_doctor\": \"Dr. Anna Schmidt\", \"start_date\": \"2024-05-01\", \"end_date\": null, \"notes\": \"Take with food. Do not skip doses.\"}"
    "]}"
)

def medication_client(pdf_bytes: bytes) -> CurrentMedications:
    api_key = os.environ["MISTRAL_API_KEY"]
    client = Mistral(api_key=api_key)
    # Upload the PDF and get a signed URL
    uploaded_file = client.files.upload(
        file={
            "file_name": "uploaded_document.pdf",
            "content": pdf_bytes,
        },
        purpose="ocr"
    )
    signed_url = client.files.get_signed_url(file_id=uploaded_file.id)
    # Compose messages
    messages = [
        {
            "role": "system",
            "content": [
                {"type": "text", "text": SYS_PROMPT}
            ]
        },
        {
            "role": "user",
            "content": [
                {"type": "document_url", "document_url": signed_url.url}
            ]
        }
    ]
    chat_response = client.chat.complete(
        model=MODEL,
        messages=messages
    )
    text = chat_response.choices[0].message.content
    data = json.loads(text)
    return CurrentMedications(medications=[MedicationEntry(**entry) for entry in data["medications"]])
