package com.jay8887.backend.controller;

import com.jay8887.backend.entity.User;
import com.jay8887.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {

        User user = userService.getCurrentUser(authentication.getName());

        return ResponseEntity.ok(user);
    }
    @PutMapping("/update")
    public ResponseEntity<User> updateProfile(
            Authentication authentication,
            @RequestBody User updatedUser) {

        User user = userService.updateProfile(authentication.getName(), updatedUser);

        return ResponseEntity.ok(user);
    }
}