package com.jay8887.backend.dto;

import lombok.Data;

@Data
public class PatientResponse {

    private Long id;
    private String fullName;
    private Integer age;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private String symptoms;
}