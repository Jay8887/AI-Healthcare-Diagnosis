package com.jay8887.backend.service;

import com.jay8887.backend.dto.dashboard.MonthlyTrendResponse;
import java.time.Month;
import java.util.ArrayList;
import com.jay8887.backend.dto.dashboard.DashboardResponse;
import com.jay8887.backend.entity.PredictionHistory;
import com.jay8887.backend.repository.PredictionHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final PredictionHistoryRepository predictionHistoryRepository;

    public DashboardService(PredictionHistoryRepository predictionHistoryRepository) {
        this.predictionHistoryRepository = predictionHistoryRepository;
    }

    public DashboardResponse getDashboardStats() {

        List<PredictionHistory> predictions = predictionHistoryRepository.findAll();

        DashboardResponse response = new DashboardResponse();

        response.setTotalPredictions(predictions.size());

        long highRisk = predictions.stream()
                .filter(p -> "High".equalsIgnoreCase(p.getRiskLevel()))
                .count();

        long moderateRisk = predictions.stream()
                .filter(p -> "Medium".equalsIgnoreCase(p.getRiskLevel()))
                .count();

        long lowRisk = predictions.stream()
                .filter(p -> "Low".equalsIgnoreCase(p.getRiskLevel()))
                .count();

        response.setHighRiskCases(highRisk);
        response.setModerateRiskCases(moderateRisk);
        response.setLowRiskCases(lowRisk);

        Map<String, Integer> diseaseCount = new HashMap<>();

        for (PredictionHistory prediction : predictions) {

            String disease = prediction.getPrediction();

            diseaseCount.put(
                    disease,
                    diseaseCount.getOrDefault(disease, 0) + 1
            );
        }

        String mostPredictedDisease = "N/A";
        int max = 0;

        for (Map.Entry<String, Integer> entry : diseaseCount.entrySet()) {

            if (entry.getValue() > max) {
                max = entry.getValue();
                mostPredictedDisease = entry.getKey();
            }
        }

        response.setMostPredictedDisease(mostPredictedDisease);

        return response;
    }

    public Map<String, Long> getDiseaseDistribution() {

        List<PredictionHistory> predictions = predictionHistoryRepository.findAll();

        Map<String, Long> distribution = new LinkedHashMap<>();

        for (PredictionHistory prediction : predictions) {

            distribution.put(
                    prediction.getPrediction(),
                    distribution.getOrDefault(
                            prediction.getPrediction(),
                            0L
                    ) + 1
            );
        }

        return distribution;
    }
    public List<MonthlyTrendResponse> getMonthlyTrends() {

        List<PredictionHistory> predictions = predictionHistoryRepository.findAll();

        Map<Month, Long> monthlyCount = new LinkedHashMap<>();

        // Initialize all months with 0 predictions
        for (Month month : Month.values()) {
            monthlyCount.put(month, 0L);
        }

        // Count predictions per month
        for (PredictionHistory prediction : predictions) {
            Month month = prediction.getCreatedAt().getMonth();
            monthlyCount.put(month, monthlyCount.get(month) + 1);
        }

        List<MonthlyTrendResponse> response = new ArrayList<>();

        for (Map.Entry<Month, Long> entry : monthlyCount.entrySet()) {
            response.add(new MonthlyTrendResponse(
                    entry.getKey().name(),
                    entry.getValue()
            ));
        }

        return response;
    }
}