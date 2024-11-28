package com.dhruva.student.service;

import com.dhruva.student.model.Admin;
import com.dhruva.student.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin validateAdmin(String username, String password) {
        return adminRepository.findByUsername(username)
            .filter(admin -> passwordEncoder.matches(password, admin.getPassword()))
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
} 