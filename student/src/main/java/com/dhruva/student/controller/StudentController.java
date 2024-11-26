package com.dhruva.student.controller;

import com.dhruva.student.model.student;
import com.dhruva.student.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public student addStudent(@RequestBody student newStudent) {
        return studentService.addStudent(newStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudentById(id);
    }
}