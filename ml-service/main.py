from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load trained model
model = joblib.load("model/disease_model.pkl")


class Symptoms(BaseModel):
    fever: bool
    cough: bool
    headache: bool
    fatigue: bool
    sore_throat: bool
    body_pain: bool
    nausea: bool
    vomiting: bool
    diarrhea: bool
    chest_pain: bool
    shortness_of_breath: bool
    loss_of_smell: bool


@app.get("/")
def home():
    return {"message": "AI Healthcare Diagnosis API Running"}


@app.get("/health")
def health():
    return {"status": "Healthy"}


@app.post("/predict")
def predict(symptoms: Symptoms):

    features = np.array([[
        int(symptoms.fever),
        int(symptoms.cough),
        int(symptoms.headache),
        int(symptoms.fatigue),
        int(symptoms.sore_throat),
        int(symptoms.body_pain),
        int(symptoms.nausea),
        int(symptoms.vomiting),
        int(symptoms.diarrhea),
        int(symptoms.chest_pain),
        int(symptoms.shortness_of_breath),
        int(symptoms.loss_of_smell)
    ]])

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]
    confidence = round(float(np.max(probabilities) * 100), 2)

    return {
        "prediction": prediction,
        "confidence": confidence
    }