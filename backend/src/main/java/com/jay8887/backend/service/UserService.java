package com.jay8887.backend.service;

import com.jay8887.backend.dto.LoginRequest;
import com.jay8887.backend.dto.LoginResponse;
import com.jay8887.backend.dto.RegisterRequest;
import com.jay8887.backend.dto.RegisterResponse;
import com.jay8887.backend.entity.User;
import com.jay8887.backend.repository.UserRepository;
import com.jay8887.backend.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());   // BCrypt later
        user.setRole("PATIENT");

        userRepository.save(user);

        return new RegisterResponse("User Registered Successfully");
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                "Login Successful",
                token
        );
    }
}