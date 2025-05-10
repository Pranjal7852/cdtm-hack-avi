import pytesseract
from PIL import Image
from io import BytesIO
from typing import List, Dict

class OCRService:
    @staticmethod
    async def extract_text_from_images(images: List[bytes]) -> List[Dict[str, str]]:
        results = []
        
        for idx, image_bytes in enumerate(images):
            try:
                # Convert bytes to PIL Image
                image = Image.open(BytesIO(image_bytes))
                
                # Extract text using pytesseract
                text = pytesseract.image_to_string(image)
                
                results.append({
                    "image_id": idx,
                    "text": text.strip(),
                    "status": "success"
                })
            except Exception as e:
                results.append({
                    "image_id": idx,
                    "text": "",
                    "status": "error",
                    "error": str(e)
                })
        
        return results 