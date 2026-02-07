import requests
from app.core.config import NASA_API_KEY

NASA_FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed"

def fetch_today_asteroids():
    params = {
        "api_key": NASA_API_KEY
    }
    response = requests.get(NASA_FEED_URL, params=params)
    response.raise_for_status()
    return response.json()
