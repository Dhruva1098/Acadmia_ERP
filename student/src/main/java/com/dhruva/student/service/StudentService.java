package com.dhruva.student.service;

import com.dhruva.student.model.Domain;
import com.dhruva.student.model.Student;
import com.dhruva.student.repository.StudentRepository;
import com.dhruva.student.repository.DomainRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final DomainRepository domainRepository;

    public StudentService(StudentRepository studentRepository, DomainRepository domainRepository) {
        this.studentRepository = studentRepository;
        this.domainRepository = domainRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByDomain(Long domainId) {
        return studentRepository.findByDomainId(domainId);
    }

    public Student addStudent(Student newStudent) {
        // Fetch the domain by ID
        Long domainId = newStudent.getDomain().getId();
        Optional<Domain> domainOptional = domainRepository.findById(domainId);

        if (domainOptional.isPresent()) {
            Domain domain = domainOptional.get();
            newStudent.setDomain(domain); // Set the correct domain

            // Save the student, automatically generating studentId
            return studentRepository.save(newStudent);
        } else {
            throw new RuntimeException("Domain with ID " + domainId + " not found.");
        }
    }

    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }
}