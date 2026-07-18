package com.jay8887.backend.controller;

import com.jay8887.backend.dto.ai.PredictionRequest;
import com.jay8887.backend.dto.ai.PredictionResponse;
import com.jay8887.backend.service.ai.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/predict")
    public PredictionResponse predict(
            @RequestBody PredictionRequest request
    ) {
        return aiService.predictDisease(request);
    }
}