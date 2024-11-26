package com.dhruva.student.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Year;

@Entity
@Data
public class student {
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
    private String domain;
    private String gender;

    @PostPersist
    public void generateStudentId() {
        String prefix = determinePrefix(domain);
        String year = String.valueOf(Year.now().getValue());
        String end = String.format("%03d", id);
        this.studentId = prefix + year + end;
    }
    private String determinePrefix(String domain) {
        String normalised = domain.toLowerCase();
        if(normalised.contains("imtech")) {
            return "IMT";
        } else if(normalised.contains("mtech")) {
            return "MT";
        } else if(normalised.contains("ms")) {
            return "MS";
        } else {
            throw new IllegalArgumentException("Invalid domain: " + domain);
        }
    }


}
