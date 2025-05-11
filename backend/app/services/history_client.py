import os
import json
from typing import List
from pydantic import BaseModel, Field
from mistralai import Mistral

class MedicalHistoryEntry(BaseModel):
    diagnosis: str = Field(
        ...,
        description="The name or description of the previous diagnosis (e.g., 'Type 2 Diabetes', 'Hypertension').",
        example="Type 2 Diabetes"
    )
    diagnosis_date: str = Field(
        ...,
        description="Date when the diagnosis was made, in ISO format (YYYY-MM-DD) or as found in the document.",
        example="2020-05-15"
    )
    treatments: List[str] = Field(
        ...,
        description="List of treatments, medications, or interventions related to this diagnosis.",
        example=["Metformin", "Dietary changes"]
    )
    outcome: str = Field(
        ...,
        description="Current status or outcome of the diagnosis/treatment (e.g., 'ongoing', 'resolved', 'in remission').",
        example="ongoing"
    )
    notes: str = Field(
        None,
        description="Additional notes or comments about the diagnosis or treatment.",
        example="Patient responded well to medication."
    )

class MedicalHistory(BaseModel):
    history: List[MedicalHistoryEntry] = Field(
        ...,
        description="List of all extracted previous diagnoses and treatments from the document."
    )

MODEL = "mistral-small-latest"

SYS_PROMPT = (
    "You are a medical assistant AI. You will receive a PDF document containing a patient's previous medical history. "
    "Your task is to extract all previous diagnoses and their associated treatments from the document. "
    "For each entry, provide the following fields as accurately as possible: "
    "- diagnosis: The name or description of the diagnosis (e.g., 'Type 2 Diabetes', 'Hypertension'). "
    "- diagnosis_date: The date when the diagnosis was made, in ISO format (YYYY-MM-DD) or as found in the document. "
    "- treatments: A list of treatments, medications, or interventions related to this diagnosis. "
    "- outcome: The current status or outcome of the diagnosis/treatment (e.g., 'ongoing', 'resolved', 'in remission'). "
    "- notes: Any additional notes or comments about the diagnosis or treatment. "
    "If a field is missing in the document, leave it empty or use null. "
    "Return your answer as a JSON object with a single key 'history', which contains a list of entries, each following this schema: "
    f"{MedicalHistory.model_json_schema()} "
    "Example Response: {\"history\": ["
    "{\"diagnosis\": \"Type 2 Diabetes\", \"diagnosis_date\": \"2020-05-15\", \"treatments\": [\"Metformin\", \"Dietary changes\"], \"outcome\": \"ongoing\", \"notes\": \"Patient responded well to medication.\"}"
    "]}"
)

def pdf_client(pdf_bytes: bytes) -> MedicalHistory:
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
    return MedicalHistory(history=[MedicalHistoryEntry(**entry) for entry in data["history"]])
