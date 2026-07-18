import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# Sample training data
data = {
    "fever": [1,1,1,0,0,1,0,1],
    "cough": [1,1,0,1,0,1,0,0],
    "headache": [1,0,1,1,0,0,1,1],
    "fatigue": [1,1,1,0,1,0,0,1],
    "disease": [
        "Flu",
        "Flu",
        "Flu",
        "Cold",
        "Healthy",
        "Cold",
        "Healthy",
        "Flu"
    ]
}

df = pd.DataFrame(data)

X = df[["fever", "cough", "headache", "fatigue"]]
y = df["disease"]

model = DecisionTreeClassifier(random_state=42)
model.fit(X, y)

joblib.dump(model, "model/disease_model.pkl")

print("Model trained successfully!")