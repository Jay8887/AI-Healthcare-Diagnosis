package com.jay8887.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "patients")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    private Integer age;

    private String gender;

    @Column(unique = true)
    private String email;

    private String phone;

    private String address;

    @Column(length = 1000)
    private String symptoms;
}