from fastapi import FastAPI
from app.routes import router
from app.database import init_db

app = FastAPI(
    title="Azure Medical Portal API",
    description="Backend API for the Azure Secure 3-Tier Medical Portal project.",
    version="1.0.0"
)

init_db()
app.include_router(router)
