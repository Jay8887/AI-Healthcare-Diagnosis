package com.jay8887.backend.service;

import com.jay8887.backend.dto.ai.PredictionRequest;
import com.jay8887.backend.dto.ai.PredictionResponse;
import com.jay8887.backend.entity.PredictionHistory;
import com.jay8887.backend.entity.User;
import com.jay8887.backend.repository.PredictionHistoryRepository;
import com.jay8887.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PredictionHistoryService {

    private final PredictionHistoryRepository repository;
    private final UserRepository userRepository;

    public PredictionHistoryService(
            PredictionHistoryRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public void savePrediction(PredictionRequest request,
                               PredictionResponse response) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PredictionHistory history = new PredictionHistory();

        history.setUser(user);

        history.setFever(request.isFever());
        history.setCough(request.isCough());
        history.setHeadache(request.isHeadache());
        history.setFatigue(request.isFatigue());

        history.setSoreThroat(request.isSoreThroat());
        history.setBodyPain(request.isBodyPain());
        history.setNausea(request.isNausea());
        history.setVomiting(request.isVomiting());
        history.setDiarrhea(request.isDiarrhea());
        history.setChestPain(request.isChestPain());
        history.setShortnessOfBreath(request.isShortnessOfBreath());
        history.setLossOfSmell(request.isLossOfSmell());

        history.setPrediction(response.getPrediction());
        history.setConfidence(response.getConfidence());
        history.setRiskLevel(response.getRiskLevel());
        history.setSeverity(response.getSeverity());
        history.setDescription(response.getDescription());
        history.setRecommendation(response.getRecommendation());

        repository.save(history);
    }
}