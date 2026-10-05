package com.fixmyarea.backend.controller;

import com.fixmyarea.backend.dto.AuthResponse;
import com.fixmyarea.backend.dto.LoginRequest;
import com.fixmyarea.backend.dto.RegisterRequest;
import com.fixmyarea.backend.entity.User;
import com.fixmyarea.backend.repository.UserRepository;
import com.fixmyarea.backend.security.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("CITIZEN");

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid email or password");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }
}