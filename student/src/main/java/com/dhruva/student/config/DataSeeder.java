//package com.dhruva.student.config;
//
//import com.dhruva.student.model.student;
//import com.dhruva.student.repository.StudentRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataSeeder implements CommandLineRunner {
//    private final StudentRepository studentRepository;
//    public DataSeeder(StudentRepository studentRepository) {
//        this.studentRepository = studentRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception{
//        studentRepository.deleteAll();
//
//        student Mohit = new student();
//        Mohit.setAddress("jodhpur");
//        Mohit.setEmail("jodhpur@gmail.com");
//        Mohit.setFirstName("Mohit");
//        Mohit.setLastName("Jodhpur");
//        Mohit.setDomain("mtech CSE");
//        Mohit.setPhone("123456789");
//        Mohit.setGender("male");
//        Mohit.setPhotographUrl("https://placehold.co/600x400");
//        studentRepository.save(Mohit);
//    }
//}
