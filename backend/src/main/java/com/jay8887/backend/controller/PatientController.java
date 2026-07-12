package com.jay8887.backend.controller;

import com.jay8887.backend.dto.PatientRequest;
import com.jay8887.backend.dto.PatientResponse;
import com.jay8887.backend.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public PatientResponse addPatient(@Valid @RequestBody PatientRequest request) {
        return patientService.savePatient(request);
    }

    @GetMapping
    public List<PatientResponse> getAllPatients() {
        return patientService.getAllPatients();
    }
    @GetMapping("/{id}")
    public PatientResponse getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }
}