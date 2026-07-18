package com.jay8887.backend.controller;

import com.jay8887.backend.entity.PredictionHistory;
import com.jay8887.backend.entity.User;
import com.jay8887.backend.repository.PredictionHistoryRepository;
import com.jay8887.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PredictionHistoryController {

    private final PredictionHistoryRepository repository;
    private final UserRepository userRepository;

    public PredictionHistoryController(
            PredictionHistoryRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping("/api/history")
    public List<PredictionHistory> getHistory() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return repository.findByUser(user);
    }
}