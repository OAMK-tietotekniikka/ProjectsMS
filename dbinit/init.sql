CREATE DATABASE IF NOT EXISTS studentsdb;
USE studentsdb;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS projects;

-- -----------------------------------------------------
-- Table `students`
-- -----------------------------------------------------

CREATE TABLE students
(
studentId   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
first_name  VARCHAR(255) DEFAULT NULL,
last_name   VARCHAR(255) DEFAULT NULL,
email       VARCHAR(255) DEFAULT NULL,
class_code  VARCHAR(255) DEFAULT NULL,
password    VARCHAR(32) DEFAULT NULL,
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (studentId),
CONSTRAINT UQ_Students_Email UNIQUE (email)
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `projects`
-- -----------------------------------------------------

CREATE TABLE  projects
(
projectId      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
projectName    VARCHAR(255) DEFAULT NULL,
projectDesc    TEXT DEFAULT NULL,
teacherId      BIGINT UNSIGNED DEFAULT NULL,
companyId      BIGINT UNSIGNED DEFAULT NULL,
projectStatus  VARCHAR(255) DEFAULT NULL,
projectUrl     VARCHAR(255) DEFAULT NULL,
start_date     DATE DEFAULT NULL,
end_date       DATE DEFAULT NULL,
created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY    (projectId)
)AUTO_INCREMENT = 1;




-- Insert student data
INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('John', 'Doe', 'johndoe@email.com', 'din21sp', '1234');

INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('Jane', 'Doe', 'janedoe@email.com', 'din20sp', '1235');


-- Insert project data
INSERT INTO projects (projectName, projectDesc, teacherId, companyId, projectStatus, projectUrl, start_date, end_date)
VALUES ('Project 1', 'This is project 1', 1, 1, 'In Progress', 'http://project1.com', '2021-01-01', '2021-02-01');

INSERT INTO projects (projectName, projectDesc, teacherId, companyId, projectStatus, projectUrl, start_date, end_date)
VALUES ('Project 2', 'This is project 2', 2, 2, 'Completed', 'http://project2.com', '2021-02-01', '2021-03-01');