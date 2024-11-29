package com.dhruva.student.service;

import com.dhruva.student.model.Domain;
import com.dhruva.student.model.Student;
import com.dhruva.student.repository.StudentRepository;
import com.dhruva.student.repository.DomainRepository;
import org.springframework.stereotype.Service;

import java.time.Year;
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
        if (newStudent.getDomain() == null || newStudent.getDomain().getId() == null) {
            throw new RuntimeException("Domain information is required");
        }
        Optional<Domain> domainOptional = domainRepository.findById(newStudent.getDomain().getId());
        if (!domainOptional.isPresent()) {
            throw new RuntimeException("Domain not found");
        }
        Domain domain = domainOptional.get();
        newStudent.setDomain(domain);
        Student savedStudent = studentRepository.save(newStudent);

        String programCode = extractProgramCode(domain.getProgram());
        String year = String.valueOf(Year.now().getValue());
        String end = String.format("%03d", savedStudent.getId());
        savedStudent.setStudentId(programCode + year + end);
        // Save again with the generated student ID
        return studentRepository.save(savedStudent);
    }

    private String extractProgramCode(String program) {
        if (program == null) return "UNK";
        return switch (program.toLowerCase()) {
            case "mtech cse", "mtech ece" -> "MT";
            case "imtech cse", "imtech ece" -> "IMT";
            case "ms cse", "ms ece" -> "MS";
            default -> "UNK";
        };
    }

    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }
}