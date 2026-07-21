package com.jay8887.backend.service;

import com.jay8887.backend.dto.LoginRequest;
import com.jay8887.backend.dto.LoginResponse;
import com.jay8887.backend.dto.RegisterRequest;
import com.jay8887.backend.dto.RegisterResponse;
import com.jay8887.backend.entity.User;
import com.jay8887.backend.repository.UserRepository;
import com.jay8887.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       JwtService jwtService,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= REGISTER =================
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        // Basic Details
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("PATIENT");

        // Profile Details
        user.setPhone(request.getPhone());
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setBloodGroup(request.getBloodGroup());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setAddress(request.getAddress());
        user.setAllergies(request.getAllergies());
        user.setEmergencyContact(request.getEmergencyContact());
        user.setMedicalHistory(request.getMedicalHistory());
        user.setProfileImage(request.getProfileImage());

        userRepository.save(user);

        return new RegisterResponse("User Registered Successfully");
    }

    // ================= LOGIN =================
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                token
        );
    }
    public User updateProfile(String email, User updatedUser) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setAge(updatedUser.getAge());
        user.setGender(updatedUser.getGender());
        user.setBloodGroup(updatedUser.getBloodGroup());
        user.setHeight(updatedUser.getHeight());
        user.setWeight(updatedUser.getWeight());
        user.setAddress(updatedUser.getAddress());
        user.setAllergies(updatedUser.getAllergies());
        user.setEmergencyContact(updatedUser.getEmergencyContact());
        user.setMedicalHistory(updatedUser.getMedicalHistory());

        return userRepository.save(user);
    }

    // ================= CURRENT USER =================
    public User getCurrentUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}