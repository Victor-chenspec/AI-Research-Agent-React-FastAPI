from fastapi import FastAPI
from .routes import research

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status":"ok"}

app.include_router(prefix="/research",router=research.router)