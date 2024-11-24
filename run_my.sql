CREATE DATABASE students;
USE students;
CREATE TABLE db_admission (
    Student_Id VARCHAR(20) PRIMARY KEY,
    Student_Name VARCHAR(255) NOT NULL,
    Father_Name VARCHAR(255),
    Mother_Name VARCHAR(255),
    Dob DATE,
    Address TEXT,
    Photograph_Path VARCHAR(500) NOT NULL,
    Domain VARCHAR(100) NOT NULL
);
