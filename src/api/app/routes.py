import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal, PatientDB
from app.models import Patient, PatientCreate

router = APIRouter()
logger = logging.getLogger(__name__)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def read_root():
    logger.info("GET / called")
    return {"message": "Azure Medical Portal API is running"}


@router.get("/health")
def health_check():
    logger.info("GET /health called")
    return {"status": "healthy"}


@router.get("/patients", response_model=list[Patient])
def get_patients(db: Session = Depends(get_db)):
    logger.info("GET /patients called")
    return db.query(PatientDB).all()


@router.get("/patients/{patient_id}", response_model=Patient)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    logger.info(f"GET /patients/{patient_id} called")
    patient = db.query(PatientDB).filter(PatientDB.id == patient_id).first()
    if patient is None:
        logger.warning(f"Patient {patient_id} not found")
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.post("/patients", response_model=Patient)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    logger.info(f"POST /patients called for {patient.name}")
    new_patient = PatientDB(
        name=patient.name,
        age=patient.age,
        condition=patient.condition
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient