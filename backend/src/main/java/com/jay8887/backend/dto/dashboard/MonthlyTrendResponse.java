package com.jay8887.backend.dto.dashboard;

public class MonthlyTrendResponse {

    private String month;
    private long predictions;

    public MonthlyTrendResponse() {
    }

    public MonthlyTrendResponse(String month, long predictions) {
        this.month = month;
        this.predictions = predictions;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getPredictions() {
        return predictions;
    }

    public void setPredictions(long predictions) {
        this.predictions = predictions;
    }
}