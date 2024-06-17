import { connection } from "./config/mysql.config";

//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database

const createTables = async () => {
    try {
        const pool = await connection();

        if (!pool) {
            throw new Error('Failed to get database connection pool');
        }

        //delete tables if they exist
        await pool.execute('DROP TABLE IF EXISTS students');
        await pool.execute('DROP TABLE IF EXISTS projects');
        await pool.execute('DROP TABLE IF EXISTS teachers');
        await pool.execute('DROP TABLE IF EXISTS companies');
        await pool.execute('DROP TABLE IF EXISTS resources');


        await pool.execute(`CREATE TABLE IF NOT EXISTS companies (
            company_id INT NOT NULL AUTO_INCREMENT,
            company_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (companyId)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacher_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacherId)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS projects (
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
            PRIMARY KEY (projectId),
            FOREIGN KEY (teacherId) REFERENCES teachers(teacherId),
            FOREIGN KEY (companyId) REFERENCES companies(companyId)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS students (
            student_id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            class_code VARCHAR(255) DEFAULT NULL,
            password VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (studentId)
            CONSTRAINT UC_students_email UNIQUE (email)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS resources (
            resource_id INT NOT NULL AUTO_INCREMENT,
            teacher_id INT DEFAULT NULL,
            total_resources INT DEFAULT NULL,
            used_esources INT DEFAULT NULL,
            study_year VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (resourceId),
            FOREIGN KEY (teacherId) REFERENCES teachers(teacherId)
        )`);
        console.log('Tables created successfully');
    } catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    }
};

export default createTables;