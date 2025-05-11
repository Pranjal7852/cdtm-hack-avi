from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from mistralai import Mistral
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str  # Assuming content is a string based on the documentation

class ConsultationRequest(BaseModel):
    messages: List[Message]

@router.post("/consult")
async def initial_consultation(request: ConsultationRequest):
    try:
        # Retrieve the API key from environment variables
        api_key = os.getenv("MISTRAL_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

        # Initialize the Mistral client
        client = Mistral(api_key=api_key)

        # Get the chat response using the specific agent ID
        chat_response = client.agents.complete(
            agent_id="ag:bb673296:20250510:untitled-agent:db0d4005",
            messages=[msg.dict() for msg in request.messages]
        )

        return {
            "response": chat_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
