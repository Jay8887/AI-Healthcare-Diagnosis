import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier

# Load Dataset
df = pd.read_csv("data/disease_dataset.csv")

# Features
X = df[
    [
        "fever",
        "cough",
        "headache",
        "fatigue",
        "sore_throat",
        "body_pain",
        "nausea",
        "vomiting",
        "diarrhea",
        "chest_pain",
        "shortness_of_breath",
        "loss_of_smell"
    ]
]

# Target
y = df["disease"]

# Train Random Forest
model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model.fit(X, y)

# Save Model
joblib.dump(model, "model/disease_model.pkl")

print("Model trained successfully!")
print("Diseases:", sorted(y.unique()))