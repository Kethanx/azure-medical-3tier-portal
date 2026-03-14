from opencensus.ext.azure.log_exporter import AzureLogHandler
import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

from azure.monitor.opentelemetry import configure_azure_monitor

configure_azure_monitor()

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

connection_string = os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING")
if connection_string:
    logger.addHandler(
        AzureLogHandler(connection_string=connection_string)
    )

logger.warning("Application started")

app = FastAPI(
    title="Azure Medical Portal API",
    description="Backend API for the Azure Secure 3-Tier Medical Portal project.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_origin_regex=r"https://.*\.azurestaticapps\.net",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
logger.info("FastAPI application started successfully")