from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.services.ocr.ocr_service import OCRService

router = APIRouter()

@router.post("/extract-text")
async def extract_text_from_images(
    files: List[UploadFile] = File(...)
):
    """
    Extract text from multiple uploaded images.
    
    Args:
        files: List of image files to process
        
    Returns:
        List of dictionaries containing extracted text and status for each image
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    # Read all image files
    image_bytes_list = []
    for file in files:
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail=f"File {file.filename} is not an image"
            )
        image_bytes_list.append(await file.read())
    
    # Process images using OCR service
    results = await OCRService.extract_text_from_images(image_bytes_list)
    
    return {
        "status": "success",
        "results": results
    } 