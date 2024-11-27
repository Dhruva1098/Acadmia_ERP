package com.dhruva.student.controller;

import com.dhruva.student.model.Domain;
import com.dhruva.student.model.Student;
import com.dhruva.student.service.DomainService;
import com.dhruva.student.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/domain")
@CrossOrigin(origins = "http://localhost:5173")
public class DomainController {

    private final DomainService domainService;
    private final StudentService studentService;

    public DomainController(DomainService domainService, StudentService studentService) {
        this.domainService = domainService;
        this.studentService = studentService;
    }

    // Fetch all domains
    @GetMapping
    public List<Domain> getAllDomains() {
        return domainService.getAllDomains();
    }

    // Fetch students by domain ID
    @GetMapping("/{id}/students")
    public List<Student> getStudentsByDomain(@PathVariable Long id) {
        return studentService.getStudentsByDomain(id);
    }

    // Create a new student and assign domain based on the domain ID
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        // Fetch domain by ID
        Domain domain = domainService.getDomainById(student.getDomain().getId());
        if (domain != null) {
            student.setDomain(domain); // Set the domain to the student
        } else {
            throw new RuntimeException("Domain not found");
        }

        // Save the student
        return studentService.addStudent(student);
    }
}