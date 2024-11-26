package com.dhruva.student.service;

import com.dhruva.student.model.student;
import com.dhruva.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<student> getAllStudents() {
        return studentRepository.findAll();
    }

    public student addStudent(student newStudent) {
        return studentRepository.save(newStudent);
    }

    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }
}