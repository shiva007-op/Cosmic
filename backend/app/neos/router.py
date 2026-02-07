from fastapi import APIRouter
from app.neos.nasa_client import fetch_today_asteroids
from app.risk.scorer import calculate_risk

# ✅ Router MUST be defined before decorators
router = APIRouter()

@router.get("/today")
def today_asteroids():
    data = fetch_today_asteroids()
    results = []

    for date in data.get("near_earth_objects", {}):
        for neo in data["near_earth_objects"][date]:

            if not neo.get("close_approach_data"):
                continue

            approach = neo["close_approach_data"][0]

            results.append({
                "id": neo["id"],
                "name": neo["name"],
                "hazardous": neo["is_potentially_hazardous_asteroid"],
                "diameter_m": round(
                    neo["estimated_diameter"]["meters"]["estimated_diameter_max"], 2
                ),
                "miss_distance_km": round(
                    float(approach["miss_distance"]["kilometers"]), 2
                ),
                "velocity_km_s": round(
                    float(approach["relative_velocity"]["kilometers_per_second"]), 2
                ),
                "close_approach_date": approach["close_approach_date"],
                "risk": calculate_risk(neo)
            })

    return results
