package com.dhruva.student.controller;

import com.dhruva.student.model.Admin;
import com.dhruva.student.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Admin validatedAdmin = adminService.validateAdmin(admin.getUsername(), admin.getPassword());
        if (validatedAdmin != null) {
            return ResponseEntity.ok().body("{\"status\": \"success\"}");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"status\": \"error\"}");
    }
} 