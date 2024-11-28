package com.dhruva.student.controller;

import com.dhruva.student.model.Admin;
import com.dhruva.student.service.AdminService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    private final AdminService adminService;

    public AuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        try {
            Admin admin = adminService.validateAdmin(
                credentials.get("username"),
                credentials.get("password")
            );
            session.setAttribute("ADMIN_ID", admin.getId());
            return ResponseEntity.ok().body(Map.of("username", admin.getUsername()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(HttpSession session) {
        return session.getAttribute("ADMIN_ID") != null
            ? ResponseEntity.ok().build()
            : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
} 