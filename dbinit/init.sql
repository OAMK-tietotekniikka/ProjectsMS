CREATE DATABASE IF NOT EXISTS studentsdb;
USE studentsdb;
DROP TABLE IF EXISTS company_teacher;
DROP TABLE IF EXISTS student_project;
DROP TABLE IF EXISTS project_note;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS companies;





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
PRIMARY KEY    (project_id),
CONSTRAINT name_teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
CONSTRAINT name_company_id FOREIGN KEY (company_id) REFERENCES companies (company_id) ON DELETE NO ACTION ON UPDATE NO ACTION
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `teachers`
-- -----------------------------------------------------

CREATE TABLE teachers
(teacher_id  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
first_name   VARCHAR(255) DEFAULT NULL,
last_name    VARCHAR(255) DEFAULT NULL,
email        VARCHAR(255) DEFAULT NULL,
created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (teacher_id),
CONSTRAINT UQ_Teachers_Email UNIQUE (email)
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `companies`
-- -----------------------------------------------------

CREATE TABLE companies
(company_id  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
company_name VARCHAR(255) DEFAULT NULL,
created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (company_id)
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table ´resources´
-- -----------------------------------------------------
CREATE TABLE resources
(resource_id  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
teacher_id   BIGINT UNSIGNED DEFAULT NULL,
total_resources INT DEFAULT 0,
used_resources INT DEFAULT 0,
study_year   VARCHAR(25) DEFAULT NULL,
created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (resource_id),
CONSTRAINT teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id) ON DELETE NO ACTION ON UPDATE NO ACTION
)AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `project_note`
-- -----------------------------------------------------
CREATE TABLE project_note (
    note_id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    project_id    BIGINT UNSIGNED DEFAULT NULL,
    note          VARCHAR(300) DEFAULT NULL,
    document_path VARCHAR(255) DEFAULT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (note_id),
    CONSTRAINT FK_ProjectNote_Project FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE NO ACTION ON UPDATE NO ACTION
) AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `student_project`
-- -----------------------------------------------------
CREATE TABLE student_project (
    student_id BIGINT UNSIGNED NOT NULL,
    project_id BIGINT UNSIGNED NOT NULL,
    project_number INT DEFAULT 0,
    PRIMARY KEY (student_id, project_id)
);

-- -- -----------------------------------------------------
-- -- Table `company_teacher`
-- -- -----------------------------------------------------
CREATE TABLE company_teacher (
    company_id BIGINT UNSIGNED NOT NULL,
    teacher_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (company_id, teacher_id)
);


-- Insert student data
INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('John', 'Doe', 'johndoe@email.com', 'din21sp', '1234');

INSERT INTO students (first_name, last_name, email, class_code, password)
VALUES ('Jane', 'Doe', 'janedoe@email.com', 'din20sp', '1235');


-- Insert project data
INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date)
VALUES ('Project 1', 'This is project 1', 1, 1, 'ongoing', 'http://project1.com', '2021-01-01', '2021-02-01');

INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date)
VALUES ('Project 2', 'This is project 2', 2, 2, 'completed', 'http://project2.com', '2021-02-01', '2021-03-01');

INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date)
VALUES ('Project 3', 'This is project 3', 1, 3, 'completed', 'http://project3.com', '2021-03-01', '2021-04-01');

-- Insert company data
INSERT INTO companies (company_name)
VALUES ('Nokia');

INSERT INTO companies (company_name)
VALUES ('Microsoft');

INSERT INTO companies (company_name)
VALUES ('Google');

-- Insert teacher data
INSERT INTO teachers (first_name, last_name, email)
VALUES ('Teacher', 'One', 'teacher1@mail.com');

INSERT INTO teachers (first_name, last_name, email)
VALUES ('Teacher', 'Two', 'teacher2@mail.com');

INSERT INTO teachers (first_name, last_name, email)
VALUES ('Teacher', 'Three', 'teacher3@mail.com');

-- Insert company_teacher data

INSERT INTO company_teacher (company_id, teacher_id)
VALUES (2,1);

INSERT INTO company_teacher (company_id, teacher_id)
VALUES (1,2);

INSERT INTO company_teacher (company_id, teacher_id)
VALUES (3,1);

-- Insert resources data
INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (1, 5, 2, '2021-2022');

INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (2, 20, 0, '2023-2024');

INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (1, 7, 0, '2023-2024');

INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (1, 5, 2, '2020-2021');

INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (3, 5, 5, '2023-2024');

INSERT INTO resources (teacher_id, total_resources, used_resources, study_year)
VALUES (1, 5, 0, '2023-2024'); 

-- Insert student_project data

INSERT INTO student_project (student_id, project_id, project_number)
VALUES (1, 1, 1);

INSERT INTO student_project (student_id, project_id, project_number)
VALUES (2, 2, 1);

INSERT INTO student_project (student_id, project_id, project_number)
VALUES (2, 4, 1);
```


