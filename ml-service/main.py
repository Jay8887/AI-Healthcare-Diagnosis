from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI(
    title="AI Healthcare Diagnosis API",
    version="1.0.0"
)

# Load trained model
model = joblib.load("model/disease_model.pkl")


class PatientSymptoms(BaseModel):
    fever: bool
    cough: bool
    headache: bool
    fatigue: bool


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Healthcare Diagnosis API"
    }


@app.get("/health")
def health():
    return {
        "status": "Running Successfully"
    }


@app.post("/predict")
def predict(data: PatientSymptoms):

    features = [[
        int(data.fever),
        int(data.cough),
        int(data.headache),
        int(data.fatigue)
    ]]

    prediction = model.predict(features)[0]

    return {
        "prediction": prediction
    }