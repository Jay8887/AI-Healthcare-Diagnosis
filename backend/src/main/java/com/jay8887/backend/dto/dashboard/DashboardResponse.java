package com.jay8887.backend.dto.dashboard;

public class DashboardResponse {

    private long totalPredictions;
    private long highRiskCases;
    private long moderateRiskCases;
    private long lowRiskCases;
    private String mostPredictedDisease;

    public DashboardResponse() {
    }

    public long getTotalPredictions() {
        return totalPredictions;
    }

    public void setTotalPredictions(long totalPredictions) {
        this.totalPredictions = totalPredictions;
    }

    public long getHighRiskCases() {
        return highRiskCases;
    }

    public void setHighRiskCases(long highRiskCases) {
        this.highRiskCases = highRiskCases;
    }

    public long getModerateRiskCases() {
        return moderateRiskCases;
    }

    public void setModerateRiskCases(long moderateRiskCases) {
        this.moderateRiskCases = moderateRiskCases;
    }

    public long getLowRiskCases() {
        return lowRiskCases;
    }

    public void setLowRiskCases(long lowRiskCases) {
        this.lowRiskCases = lowRiskCases;
    }

    public String getMostPredictedDisease() {
        return mostPredictedDisease;
    }

    public void setMostPredictedDisease(String mostPredictedDisease) {
        this.mostPredictedDisease = mostPredictedDisease;
    }
}