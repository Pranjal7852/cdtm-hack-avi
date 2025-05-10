import asyncio
from backend.app.services.vac_mistral import call_mistral_api

if __name__ == "__main__":
    image_path = "vaccination_img/IMG_4193.jpg"
    with open(image_path, "rb") as f:
        image_bytes = f.read()
    result = asyncio.run(call_mistral_api(image_bytes))
    print(result)