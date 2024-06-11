CREATE DATABASE IF NOT EXISTS studentsdb;
USE studentsdb;
DROP TABLE IF EXISTS students;

CREATE TABLE students
(
id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
first_name  VARCHAR(255) DEFAULT NULL,
last_name   VARCHAR(255) DEFAULT NULL,
email       VARCHAR(255) DEFAULT NULL,
class_code  VARCHAR(255) DEFAULT NULL,
password    VARCHAR(30) DEFAULT NULL,
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
CONSTRAINT UQ_Students_Email UNIQUE (email)

)AUTO_INCREMENT = 1;

-- Insert student data
INSERT INTO students (first_name, last_name, email, phone, status)
VALUES ('John', 'Doe', 'johndoe@email.com', 'din21sp', '1234');

INSERT INTO students (first_name, last_name, email, phone, status)
VALUES ('Jane', 'Doe', 'janedoe@email.com', 'din20sp', '1235');