package com.jay8887.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    // Basic Information
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // Profile Information
    private String phone;

    private Integer age;

    private String gender;

    private String bloodGroup;

    private Double height;

    private Double weight;

    private String address;

    private String allergies;

    private String emergencyContact;

    private String medicalHistory;

    private String profileImage;
}