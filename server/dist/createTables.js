"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_config_1 = __importDefault(require("./config/mysql.config"));
//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        if (!connection) {
            throw new Error('Failed to get database connection pool');
        }
        //delete tables if they exist
        yield connection.execute('DROP TABLE IF EXISTS company_teacher');
        yield connection.execute('DROP TABLE IF EXISTS student_project');
        yield connection.execute('DROP TABLE IF EXISTS project_note');
        yield connection.execute('DROP TABLE IF EXISTS students');
        yield connection.execute('DROP TABLE IF EXISTS projects');
        yield connection.execute('DROP TABLE IF EXISTS companies');
        yield connection.execute('DROP TABLE IF EXISTS resources');
        yield connection.execute('DROP TABLE IF EXISTS teachers');
        //create tables
        yield connection.execute(`CREATE TABLE IF NOT EXISTS companies (
            company_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            company_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (company_id)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacher_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            teacher_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacher_id),
            UNIQUE (email)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS projects (
            project_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            project_name VARCHAR(255) DEFAULT NULL,
            project_desc TEXT DEFAULT NULL,
            teacher_id INT UNSIGNED DEFAULT NULL,
            company_id INT UNSIGNED DEFAULT NULL,
            project_status VARCHAR(255) DEFAULT NULL,
            project_url VARCHAR(255) DEFAULT NULL,         
            start_date DATE DEFAULT NULL,
            end_date DATE DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (project_id),
            Foreign Key (teacher_id) REFERENCES teachers(teacher_id),
            Foreign Key (company_id) REFERENCES companies(company_id)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS students (
            student_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            student_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            class_code VARCHAR(25) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (student_id),
            UNIQUE (email)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS resources (
            resource_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            teacher_id INT UNSIGNED DEFAULT NULL,
            total_resources INT DEFAULT NULL,
            used_resources INT DEFAULT NULL,
            study_year VARCHAR(25) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (resource_id),
            Foreign Key (teacher_id) REFERENCES teachers(teacher_id)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS project_note (
            note_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            project_id INT UNSIGNED DEFAULT NULL,
            note VARCHAR(300) DEFAULT NULL,
            document_path VARCHAR(255) DEFAULT NULL,
            created_by VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (note_id),
            Foreign Key (project_id) REFERENCES projects (project_id)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS student_project (
            student_id INT UNSIGNED NOT NULL,
            project_id INT UNSIGNED NOT NULL,
            project_number TINYINT DEFAULT NULL,
            PRIMARY KEY (student_id, project_id)
        )`);
        yield connection.execute(`CREATE TABLE IF NOT EXISTS company_teacher (
            company_id INT UNSIGNED NOT NULL,
            teacher_id INT UNSIGNED NOT NULL,
            PRIMARY KEY (company_id, teacher_id)
        )`);
        //add dummy data to tables
        yield connection.execute(`INSERT INTO companies (company_name) VALUES ('Google')`);
        yield connection.execute(`INSERT INTO companies (company_name) VALUES ('Nokia')`);
        yield connection.execute(`INSERT INTO companies (company_name) VALUES ('Microsoft')`);
        yield connection.execute(`INSERT INTO teachers (teacher_name, email) VALUES ('Teacher One', 'teacher1@mail.com')`);
        yield connection.execute(`INSERT INTO teachers (teacher_name, email) VALUES ('Teacher Two', 'teacher2@mail.com')`);
        yield connection.execute(`INSERT INTO students (student_name, email, class_code) VALUES ('John Doe', 'john@mail.com', 'din23sp')`);
        yield connection.execute(`INSERT INTO students (student_name, email, class_code) VALUES ('Jane Doe', 'jane@mail.com', 'din21sp')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (1, 10, 7, '2021-2022')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (1, 7, 7, '2022-2023')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (1, 7, 1, '2023-2024')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (2, 5, 5, '2023-2024')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (2, 5, 2, '2024-2025')`);
        yield connection.execute(`INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (1, 5, 2, '2024-2025')`);
        yield connection.execute(`INSERT INTO company_teacher (company_id, teacher_id) VALUES (1, 1)`);
        yield connection.execute(`INSERT INTO company_teacher (company_id, teacher_id) VALUES (2, 2)`);
        yield connection.execute(`INSERT INTO company_teacher (company_id, teacher_id) VALUES (3, 1)`);
        yield connection.execute(`INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date) VALUES ('Project One', 'Project One Description', 1, 1, 'ongoing', 'http://projectone.com', '2024-09-08', '2024-12-30')`);
        yield connection.execute(`INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date) VALUES ('Project Two', 'Project Two Description', 2, 2, 'completed', 'http://projecttwo.com', '2024-08-08', '2024-10-30')`);
        yield connection.execute(`INSERT INTO student_project (student_id, project_id, project_number) VALUES (1, 1, 1)`);
        yield connection.execute(`INSERT INTO student_project (student_id, project_id, project_number) VALUES (2, 2, 1)`);
        console.log('Tables created successfully');
    }
    catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.default = createTables;
