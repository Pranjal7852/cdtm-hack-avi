# Image Processing Backend

This backend service provides APIs for processing images and extracting text using OCR.

## Prerequisites

- Python 3.8+
- Tesseract OCR installed on your system

### Installing Tesseract OCR

#### macOS
```bash
brew install tesseract
```

#### Ubuntu/Debian
```bash
sudo apt-get install tesseract-ocr
```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### POST /api/v1/ocr/extract-text
Upload multiple images and extract text from them.

Request:
- Content-Type: multipart/form-data
- Body: Multiple image files

Response:
```json
{
    "status": "success",
    "results": [
        {
            "image_id": 0,
            "text": "extracted text",
            "status": "success"
        }
    ]
}
``` 