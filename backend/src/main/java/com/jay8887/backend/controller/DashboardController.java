package com.jay8887.backend.controller;

import com.jay8887.backend.dto.dashboard.DashboardResponse;
import com.jay8887.backend.dto.dashboard.MonthlyTrendResponse;
import com.jay8887.backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardResponse getDashboardStats() {
        return dashboardService.getDashboardStats();
    }

    @GetMapping("/disease-distribution")
    public Map<String, Long> getDiseaseDistribution() {
        return dashboardService.getDiseaseDistribution();
    }

    @GetMapping("/monthly-trends")
    public List<MonthlyTrendResponse> getMonthlyTrends() {
        return dashboardService.getMonthlyTrends();
    }
}