from fastapi import APIRouter
from app.models import Patient

router = APIRouter()

sample_patients = [
    Patient(id=1, name="John Doe", age=45, condition="Hypertension"),
    Patient(id=2, name="Jane Smith", age=37, condition="Diabetes"),
]


@router.get("/")
def read_root():
    return {"message": "Azure Medical Portal API is running"}


@router.get("/patients")
def get_patients():
    return sample_patients


@router.get("/patients/{patient_id}")
def get_patient(patient_id: int):
    for patient in sample_patients:
        if patient.id == patient_id:
            return patient
    return {"error": "Patient not found"}


@router.post("/patients")
def create_patient(patient: Patient):
    sample_patients.append(patient)
    return {
        "message": "Patient created successfully",
        "patient": patient
    }