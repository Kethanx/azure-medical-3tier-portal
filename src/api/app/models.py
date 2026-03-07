from pydantic import BaseModel


class PatientCreate(BaseModel):
    name: str
    age: int
    condition: str


class Patient(BaseModel):
    id: int
    name: str
    age: int
    condition: str

    class Config:
        from_attributes = True