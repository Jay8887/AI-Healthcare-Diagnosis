package com.jay8887.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PatientRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotNull(message = "Age is required")
    @Min(value = 1)
    @Max(value = 120)
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone Number is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Symptoms are required")
    private String symptoms;
}