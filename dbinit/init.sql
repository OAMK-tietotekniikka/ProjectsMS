CREATE DATABASE IF NOT EXISTS studentsdb;
USE studentsdb;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS projects;

-- -----------------------------------------------------
-- Table `students`
-- -----------------------------------------------------

CREATE TABLE students
(
student_id   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
first_name  VARCHAR(255) DEFAULT NULL,
last_name   VARCHAR(255) DEFAULT NULL,
email       VARCHAR(255) DEFAULT NULL,
class_code  VARCHAR(255) DEFAULT NULL,
password    VARCHAR(32) DEFAULT NULL,
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (student_id),
CONSTRAINT UQ_Students_Email UNIQUE (email)
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `projects`
-- -----------------------------------------------------

CREATE TABLE  projects
(
project_id      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
project_name    VARCHAR(255) DEFAULT NULL,
project_desc    TEXT DEFAULT NULL,
teacher_id      BIGINT UNSIGNED DEFAULT NULL,
company_id      BIGINT UNSIGNED DEFAULT NULL,
project_status  VARCHAR(255) DEFAULT NULL,
project_url     VARCHAR(255) DEFAULT NULL,
start_date     DATE DEFAULT NULL,
end_date       DATE DEFAULT NULL,
created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY    (project_id)
)AUTO_INCREMENT = 1;




-- Insert student data
INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('John', 'Doe', 'johndoe@email.com', 'din21sp', '1234');

INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('Jane', 'Doe', 'janedoe@email.com', 'din20sp', '1235');


-- Insert project data
INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date)
VALUES ('Project 1', 'This is project 1', 1, 1, 'In Progress', 'http://project1.com', '2021-01-01', '2021-02-01');

INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date)
VALUES ('Project 2', 'This is project 2', 2, 2, 'Completed', 'http://project2.com', '2021-02-01', '2021-03-01');