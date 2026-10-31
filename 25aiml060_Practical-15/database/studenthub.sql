CREATE DATABASE IF NOT EXISTS studenthub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE studenthub;

-- Clean setup for the Practical-15 submission.
-- Importing this file replaces the three project tables and their data.
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  mobile VARCHAR(15) DEFAULT NULL,
  course VARCHAR(80) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','student') NOT NULL DEFAULT 'student',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  last_login DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE events (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  venue VARCHAR(160) NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT 'General',
  status ENUM('draft','published','closed') NOT NULL DEFAULT 'published',
  created_by INT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED DEFAULT NULL,
  action VARCHAR(80) NOT NULL,
  details VARCHAR(255) DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO events(title,description,event_date,venue,category,status) VALUES
('Campus Welcome Meetup','Meet fellow students, explore student clubs and learn about campus resources.',DATE_ADD(CURDATE(), INTERVAL 7 DAY),'Main Auditorium','Community','published'),
('Web Development Workshop','A practical introduction to responsive web design and modern frontend development.',DATE_ADD(CURDATE(), INTERVAL 14 DAY),'Computer Lab 2','Workshop','published'),
('Innovation Showcase','Explore student projects, prototypes and creative ideas from across departments.',DATE_ADD(CURDATE(), INTERVAL 21 DAY),'Innovation Hall','Exhibition','published'),
('Career Guidance Session','Learn about internships, resumes and preparing for your first job interview.',DATE_ADD(CURDATE(), INTERVAL 28 DAY),'Seminar Room','Career','published'),
('Cultural Day','Celebrate campus culture through performances, art and student participation.',DATE_ADD(CURDATE(), INTERVAL 35 DAY),'Open Ground','Culture','published');
