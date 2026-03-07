from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="Azure Medical Portal API",
    description="Backend API for the Azure Secure 3-Tier Medical Portal project.",
    version="1.0.0"
)

app.include_router(router)
