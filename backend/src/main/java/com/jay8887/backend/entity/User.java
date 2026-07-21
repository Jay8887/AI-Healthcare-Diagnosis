package com.jay8887.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;

    private String role;

    // Profile Information
    private String phone;

    private Integer age;

    private String gender;

    private String bloodGroup;

    private Double height;     // in cm

    private Double weight;     // in kg

    private String address;

    private String allergies;

    private String emergencyContact;

    private String profileImage;

    @Column(length = 1000)
    private String medicalHistory;
}