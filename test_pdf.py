import requests

API_URL = "http://localhost:8000/api/v1/medicalhistory/pdf"
PDF_PATH = "test_data/sample_medical_history.pdf"  # Change to your test PDF path

def test_upload_pdf():
    with open(PDF_PATH, "rb") as pdf_file:
        files = {"file": (PDF_PATH, pdf_file, "application/pdf")}
        response = requests.post(API_URL, files=files)
    print("Status code:", response.status_code)
    try:
        print("Response:", response.json())
    except Exception:
        print("Raw response:", response.text)

if __name__ == "__main__":
    test_upload_pdf()