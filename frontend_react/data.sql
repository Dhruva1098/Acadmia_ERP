
CREATE DATABASE IF NOT EXISTS student;
USE student;


CREATE TABLE IF NOT EXISTS domain (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    program VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20), 
    address TEXT,
    photograph_url VARCHAR(255),
    gender VARCHAR(10),
    domain_id BIGINT,
    FOREIGN KEY (domain_id) REFERENCES domain(id)
);

INSERT INTO domain (program) VALUES 
('MTech CSE'),
('MTech ECE'),
('iMTech CSE'),
('iMTech ECE'),
('MS CSE'),
('MS ECE');

INSERT INTO student (student_id, first_name, last_name, email, phone, address, gender, domain_id) VALUES 
('MT001', 'John', 'Doe', 'john.doe@example.com', '1234567890', '123 Main St', 'Male', 1),
('MT002', 'Jane', 'Smith', 'jane.smith@example.com', '9876543210', '456 Oak Ave', 'Female', 2),
('IMT001', 'Mike', 'Johnson', 'mike.j@example.com', '5555555555', '789 Pine Rd', 'Male', 3),
('IMT002', 'Sarah', 'Williams', 'sarah.w@example.com', '4444444444', '321 Elm St', 'Female', 4),
('MS001', 'David', 'Brown', 'david.b@example.com', '6666666666', '654 Maple Dr', 'Male', 5); 