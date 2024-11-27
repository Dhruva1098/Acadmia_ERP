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
    @JsonBackReference // Prevent serialization of the 'Domain' object in this side
    private Domain domain;

    @PostPersist
    public void generateStudentId() {
        String prefix = domain.getProgram(); // Use the `program` field in `Domain` for the prefix
        String year = String.valueOf(Year.now().getValue());
        String end = String.format("%03d", id);
        this.studentId = prefix + year + end;
    }
}