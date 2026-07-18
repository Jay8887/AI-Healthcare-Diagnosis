import pandas as pd
import random

random.seed(42)

rows = []

diseases = {
    "Healthy":      [0,0,0,0,0,0,0,0,0,0,0,0],
    "Common Cold":  [0,1,0,1,1,0,0,0,0,0,0,0],
    "Flu":          [1,1,1,1,1,1,0,0,0,0,0,0],
    "COVID-19":     [1,1,1,1,1,1,0,0,0,1,1,1],
    "Typhoid":      [1,0,1,1,0,1,1,0,1,0,0,0],
    "Malaria":      [1,0,1,1,0,1,1,0,0,0,0,0],
    "Dengue":       [1,0,1,1,0,1,1,1,0,0,0,0],
    "Pneumonia":    [1,1,1,1,0,1,0,0,0,1,1,0],
    "Migraine":     [0,0,1,1,0,0,1,0,0,0,0,0],
    "Food Poisoning":[0,0,0,1,0,0,1,1,1,0,0,0]
}

for disease, pattern in diseases.items():

    for _ in range(200):

        sample = pattern.copy()

        for i in range(len(sample)):
            if random.random() < 0.10:
                sample[i] = 1 - sample[i]

        sample.append(disease)

        rows.append(sample)

columns = [
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
    "loss_of_smell",
    "disease"
]

df = pd.DataFrame(rows, columns=columns)

df.to_csv("data/disease_dataset.csv", index=False)

print("Dataset Generated Successfully")
print(df.head())
print("Total Rows:", len(df))