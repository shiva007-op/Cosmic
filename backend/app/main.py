from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.neos.router import router as neos_router

app = FastAPI(title="Cosmic Watch API")

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(neos_router, prefix="/neos", tags=["NEOs"])

@app.get("/")
def root():
    return {"message": "Cosmic Watch Backend Running 🚀"}
