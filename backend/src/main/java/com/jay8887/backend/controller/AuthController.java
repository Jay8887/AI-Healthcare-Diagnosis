package com.jay8887.backend.controller;

import com.jay8887.backend.dto.LoginRequest;
import com.jay8887.backend.dto.LoginResponse;
import com.jay8887.backend.dto.RegisterRequest;
import com.jay8887.backend.dto.RegisterResponse;
import com.jay8887.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}