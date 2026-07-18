package com.jay8887.backend.service.ai;

import com.jay8887.backend.dto.ai.PredictionRequest;
import com.jay8887.backend.dto.ai.PredictionResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private static final String AI_API_URL = "http://127.0.0.1:8000/predict";

    private final RestTemplate restTemplate = new RestTemplate();

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

        return response.getBody();
    }
}