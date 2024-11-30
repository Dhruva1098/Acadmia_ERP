package com.dhruva.student.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Year;

@Entity
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String photographUrl;
    private String gender;

    @ManyToOne
    @JoinColumn(name = "domain_id", nullable = false)
    @JsonBackReference
    private Domain domain;

    @PrePersist
    @PostPersist
    public void generateStudentId() {
        if (domain != null && id != null) {
            String programCode = extractProgramCode(domain.getProgram());
            String year = String.valueOf(Year.now().getValue());
            String end = String.format("%03d", id);
            this.studentId = programCode + year + end;
        }
    }

    private String extractProgramCode(String program) {
        // Custom logic to convert program names to codes
        return switch (program.toLowerCase()) {
            case "mtech cse", "mtech ece" -> "MT";
            case "imtech cse", "imtech ece" -> "IMT";
            case "ms cse", "ms ece" -> "MS";
            default -> "UNK"; // Fallback for unknown programs
        };
    }
}