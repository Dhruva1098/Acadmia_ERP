package com.dhruva.student.repository;

import com.dhruva.student.model.student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<student, Long> {

}
