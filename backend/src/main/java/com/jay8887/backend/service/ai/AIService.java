package com.jay8887.backend.service.ai;

import java.util.List;

import com.jay8887.backend.dto.ai.PredictionRequest;
import com.jay8887.backend.dto.ai.PredictionResponse;
import com.jay8887.backend.service.PredictionHistoryService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private static final String AI_API_URL = "http://127.0.0.1:8000/predict";

    private final RestTemplate restTemplate;
    private final PredictionHistoryService predictionHistoryService;

    public AIService(PredictionHistoryService predictionHistoryService) {
        this.restTemplate = new RestTemplate();
        this.predictionHistoryService = predictionHistoryService;
    }

    public PredictionResponse predictDisease(PredictionRequest request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PredictionRequest> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<PredictionResponse> response =
                restTemplate.postForEntity(
                        AI_API_URL,
                        entity,
                        PredictionResponse.class
                );

        PredictionResponse prediction = response.getBody();

        if (prediction != null) {

            double confidence = prediction.getConfidence();

            // Risk Level
            if (confidence >= 80) {
                prediction.setRiskLevel("High");
            } else if (confidence >= 50) {
                prediction.setRiskLevel("Medium");
            } else {
                prediction.setRiskLevel("Low");
            }

            // Severity
            int symptomCount = 0;

            if (request.isFever()) symptomCount++;
            if (request.isCough()) symptomCount++;
            if (request.isHeadache()) symptomCount++;
            if (request.isFatigue()) symptomCount++;
            if (request.isSoreThroat()) symptomCount++;
            if (request.isBodyPain()) symptomCount++;
            if (request.isNausea()) symptomCount++;
            if (request.isVomiting()) symptomCount++;
            if (request.isDiarrhea()) symptomCount++;
            if (request.isChestPain()) symptomCount++;
            if (request.isShortnessOfBreath()) symptomCount++;
            if (request.isLossOfSmell()) symptomCount++;

            if (symptomCount >= 9) {
                prediction.setSeverity("Severe");
            } else if (symptomCount >= 5) {
                prediction.setSeverity("Moderate");
            } else {
                prediction.setSeverity("Mild");
            }

            // Disease Details
            switch (prediction.getPrediction()) {

                case "COVID-19":
                    prediction.setDescription(
                            "COVID-19 is a viral respiratory disease caused by SARS-CoV-2. It may affect the lungs and other organs."
                    );
                    prediction.setRecommendation(
                            "Consult a doctor immediately. Stay hydrated, isolate yourself, and monitor your oxygen level."
                    );
                    prediction.setPrecautions(List.of(
                            "Stay isolated from others",
                            "Wear a face mask",
                            "Drink plenty of fluids",
                            "Monitor oxygen level",
                            "Consult a doctor immediately if breathing becomes difficult"
                    ));
                    break;

                case "Flu":
                    prediction.setDescription(
                            "Influenza (Flu) is a contagious viral infection affecting the respiratory system."
                    );
                    prediction.setRecommendation(
                            "Take adequate rest, drink plenty of fluids, and consult a doctor if symptoms worsen."
                    );
                    prediction.setPrecautions(List.of(
                            "Take proper rest",
                            "Drink warm fluids",
                            "Avoid cold drinks",
                            "Take medicines as prescribed",
                            "Consult a doctor if fever persists"
                    ));
                    break;

                case "Common Cold":
                    prediction.setDescription(
                            "The common cold is a mild viral infection of the nose and throat."
                    );
                    prediction.setRecommendation(
                            "Drink warm fluids, get proper rest, and take over-the-counter medication if needed."
                    );
                    prediction.setPrecautions(List.of(
                            "Drink warm water",
                            "Take sufficient rest",
                            "Avoid cold environments",
                            "Eat nutritious food",
                            "Maintain proper hygiene"
                    ));
                    break;

                case "Pneumonia":
                    prediction.setDescription(
                            "Pneumonia is an infection that inflames the air sacs in one or both lungs."
                    );
                    prediction.setRecommendation(
                            "Seek immediate medical attention. Pneumonia may require antibiotics and hospital care."
                    );
                    prediction.setPrecautions(List.of(
                            "Seek immediate medical attention",
                            "Take prescribed antibiotics",
                            "Monitor breathing",
                            "Stay hydrated",
                            "Get adequate rest"
                    ));
                    break;

                case "Asthma":
                    prediction.setDescription(
                            "Asthma is a chronic condition that causes inflammation and narrowing of the airways."
                    );
                    prediction.setRecommendation(
                            "Use your prescribed inhaler and seek medical help if breathing difficulty increases."
                    );
                    prediction.setPrecautions(List.of(
                            "Keep your inhaler nearby",
                            "Avoid smoke and dust",
                            "Avoid strenuous activity during attacks",
                            "Follow your asthma action plan",
                            "Seek emergency care if breathing becomes severe"
                    ));
                    break;

                case "Bronchitis":
                    prediction.setDescription(
                            "Bronchitis is inflammation of the bronchial tubes that carry air to and from the lungs."
                    );
                    prediction.setRecommendation(
                            "Rest well, stay hydrated, and consult a doctor if cough persists."
                    );
                    prediction.setPrecautions(List.of(
                            "Avoid smoking",
                            "Drink warm fluids",
                            "Take adequate rest",
                            "Use a humidifier if recommended",
                            "Consult your doctor if symptoms worsen"
                    ));
                    break;

                case "Food Poisoning":
                    prediction.setDescription(
                            "Food poisoning is caused by consuming contaminated food or beverages."
                    );
                    prediction.setRecommendation(
                            "Drink ORS, stay hydrated, and seek medical care if vomiting or diarrhea becomes severe."
                    );
                    prediction.setPrecautions(List.of(
                            "Drink ORS regularly",
                            "Stay hydrated",
                            "Eat light meals",
                            "Avoid spicy food",
                            "Seek medical help if dehydration develops"
                    ));
                    break;

                case "Migraine":
                    prediction.setDescription(
                            "Migraine is a neurological disorder characterized by recurring headaches."
                    );
                    prediction.setRecommendation(
                            "Rest in a quiet, dark room and consult a doctor if headaches are frequent."
                    );
                    prediction.setPrecautions(List.of(
                            "Rest in a dark room",
                            "Avoid loud noises",
                            "Stay hydrated",
                            "Avoid known migraine triggers",
                            "Take medication as prescribed"
                    ));
                    break;

                case "Typhoid":
                    prediction.setDescription(
                            "Typhoid is a bacterial infection caused by Salmonella Typhi."
                    );
                    prediction.setRecommendation(
                            "Visit a healthcare provider promptly. Proper antibiotics and hydration are important."
                    );
                    prediction.setPrecautions(List.of(
                            "Complete the full antibiotic course",
                            "Drink boiled or purified water",
                            "Eat hygienic food",
                            "Take proper rest",
                            "Follow your doctor's advice"
                    ));
                    break;

                case "Malaria":
                    prediction.setDescription(
                            "Malaria is a mosquito-borne disease caused by Plasmodium parasites."
                    );
                    prediction.setRecommendation(
                            "Consult a doctor immediately for testing and antimalarial treatment."
                    );
                    prediction.setPrecautions(List.of(
                            "Take antimalarial medicines",
                            "Stay hydrated",
                            "Get adequate rest",
                            "Use mosquito nets",
                            "Seek immediate medical care if symptoms worsen"
                    ));
                    break;

                default:
                    prediction.setDescription(
                            "No detailed description is available for this condition."
                    );
                    prediction.setRecommendation(
                            "Please consult a healthcare professional for proper diagnosis and treatment."
                    );
                    prediction.setPrecautions(List.of(
                            "Maintain good hygiene",
                            "Stay hydrated",
                            "Eat a balanced diet",
                            "Get enough rest",
                            "Consult a healthcare professional"
                    ));
                    break;
            }

            predictionHistoryService.savePrediction(request, prediction);
        }

        return prediction;
    }
}