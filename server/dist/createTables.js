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
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_config_1 = require("./config/mysql.config");
//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, mysql_config_1.connection)();
        if (!pool) {
            throw new Error('Failed to get database connection pool');
        }
        //delete tables if they exist
        yield pool.execute('DROP TABLE IF EXISTS students');
        yield pool.execute('DROP TABLE IF EXISTS projects');
        yield pool.execute('DROP TABLE IF EXISTS teachers');
        yield pool.execute('DROP TABLE IF EXISTS companies');
        yield pool.execute('DROP TABLE IF EXISTS resources');
        yield pool.execute(`CREATE TABLE IF NOT EXISTS companies (
            company_id INT NOT NULL AUTO_INCREMENT,
            company_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (company_id)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacher_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacher_id)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS projects (
            project_id INT NOT NULL AUTO_INCREMENT,
            project_name VARCHAR(255) DEFAULT NULL,
            project_desc TEXT DEFAULT NULL,
            teacher_id INT DEFAULT NULL,
            company_id INT DEFAULT NULL,
            project_status VARCHAR(255) DEFAULT NULL,
            project_url VARCHAR(255) DEFAULT NULL,         
            start_date DATE DEFAULT NULL,
            end_date DATE DEFAULT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (project_id),
            FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
            FOREIGN KEY (company_id) REFERENCES companies(company_id)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS students (
            student_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            class_code VARCHAR(255) DEFAULT NULL,
            password VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (student_id),
            UNIQUE (email)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS resources (
            resource_id INT NOT NULL AUTO_INCREMENT,
            teacher_id INT DEFAULT NULL,
            total_resources INT DEFAULT NULL,
            used_esources INT DEFAULT NULL,
            study_year VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (resource_id),
            FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
        )`);
        console.log('Tables created successfully');
    }
    catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    }
});
exports.default = createTables;
