package com.dhruva.student.controller;

import com.dhruva.student.model.Admin;
import com.dhruva.student.security.JwtUtil;
import com.dhruva.student.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AdminService adminService;
    private final JwtUtil jwtUtil;

    public AuthController(AdminService adminService, JwtUtil jwtUtil) {
        this.adminService = adminService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            Admin admin = adminService.validateAdmin(
                credentials.get("username"),
                credentials.get("password")
            );
            String token = jwtUtil.generateToken(admin.getUsername());
            return ResponseEntity.ok().body(Map.of(
                "token", token,
                "username", admin.getUsername()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
} 