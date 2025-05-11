import requests

API_URL = "http://localhost:8000/api/v1/upload/vaccination_certificate/"
IMAGE_PATH = "vaccination_img/IMG_4193.jpg"

def test_digitalize_certificate():
    with open(IMAGE_PATH, "rb") as img_file:
        files = {"file": (IMAGE_PATH, img_file, "image/jpeg")}
        response = requests.post(API_URL, files=files)
    print("Status code:", response.status_code)
    try:
        print("Response:", response.json())
    except Exception:
        print("Raw response:", response.text)

if __name__ == "__main__":
    test_digitalize_certificate()