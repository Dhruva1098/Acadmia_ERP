package com.dhruva.student.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String program;
    private String qualification;
    private String batch;
    private int capacity;

    @OneToMany(mappedBy = "domain")
    @JsonManagedReference // This is the "forward" side, which will be serialized
    private List<Student> students;
}