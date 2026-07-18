package com.jay8887.backend.repository;

import com.jay8887.backend.entity.PredictionHistory;
import com.jay8887.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictionHistoryRepository
        extends JpaRepository<PredictionHistory, Long> {

    List<PredictionHistory> findByUser(User user);

}