import pool from "./config/mysql.config";

//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database

const createTables = async () => {
    let connection;
    try {
        connection = await pool.getConnection();

        if (!connection) {
            throw new Error('Failed to get database connection pool');
        }

        //delete tables if they exist
        await connection.execute('DROP TABLE IF EXISTS company_teacher');
        await connection.execute('DROP TABLE IF EXISTS student_project');
        await connection.execute('DROP TABLE IF EXISTS project_note');
        await connection.execute('DROP TABLE IF EXISTS students');
        await connection.execute('DROP TABLE IF EXISTS projects');
        await connection.execute('DROP TABLE IF EXISTS companies');
        await connection.execute('DROP TABLE IF EXISTS resources');
        await connection.execute('DROP TABLE IF EXISTS teachers');
        
        
        //create tables
        await connection.execute(`CREATE TABLE IF NOT EXISTS companies (
            company_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            company_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (company_id)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacher_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacher_id)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS company_teacher (
            company_id INT UNSIGNED NOT NULL,
            teacher_id INT UNSIGNED NOT NULL,
            PRIMARY KEY (company_id, teacher_id),
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS projects (
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

        await connection.execute(`CREATE TABLE IF NOT EXISTS students (
            student_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            class_code VARCHAR(255) DEFAULT NULL,
            password VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (student_id),
            UNIQUE (email)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS resources (
            resource_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            teacher_id INT UNSIGNED DEFAULT NULL,
            total_resources INT DEFAULT NULL,
            used_resources INT DEFAULT NULL,
            study_year VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (resource_id),
            Foreign Key (teacher_id) REFERENCES teachers(teacher_id)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS project_note (
            note_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            project_id INT UNSIGNED DEFAULT NULL,
            note VARCHAR(300) DEFAULT NULL,
            document_path VARCHAR(255) DEFAULT NULL,
            created_by VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (note_id),
            Foreign Key (project_id) REFERENCES projects (project_id)
        )`);

        await connection.execute(`CREATE TABLE IF NOT EXISTS student_project (
            student_id INT UNSIGNED DEFAULT NULL,
            project_id INT UNSIGNED DEFAULT NULL,
            project_number INT DEFAULT NULL,
            PRIMARY KEY (student_id, project_id),
        )`);

        console.log('Tables created successfully');
    } catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    } finally {
        if (connection) connection.release(); 
    }
};

export default createTables;