import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NASA_API_KEY")

def fetch_today_asteroids():
    url = f"https://api.nasa.gov/neo/rest/v1/feed?api_key={API_KEY}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
