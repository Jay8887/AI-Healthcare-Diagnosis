package com.jay8887.backend.service;

import com.jay8887.backend.dto.PatientRequest;
import com.jay8887.backend.dto.PatientResponse;
import com.jay8887.backend.entity.Patient;
import com.jay8887.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public PatientResponse savePatient(PatientRequest request) {

        Patient patient = new Patient();

        patient.setFullName(request.getFullName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setSymptoms(request.getSymptoms());

        Patient savedPatient = patientRepository.save(patient);

        return convertToResponse(savedPatient);
    }

    public List<PatientResponse> getAllPatients() {

        return patientRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private PatientResponse convertToResponse(Patient patient) {

        PatientResponse response = new PatientResponse();

        response.setId(patient.getId());
        response.setFullName(patient.getFullName());
        response.setAge(patient.getAge());
        response.setGender(patient.getGender());
        response.setEmail(patient.getEmail());
        response.setPhone(patient.getPhone());
        response.setAddress(patient.getAddress());
        response.setSymptoms(patient.getSymptoms());

        return response;
    }
    public PatientResponse getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return convertToResponse(patient);
    }
    public PatientResponse updatePatient(Long id, PatientRequest request) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patient.setFullName(request.getFullName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
        patient.setSymptoms(request.getSymptoms());

        Patient updatedPatient = patientRepository.save(patient);

        return convertToResponse(updatedPatient);
    }
    public String deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patientRepository.delete(patient);

        return "Patient deleted successfully.";
    }
}