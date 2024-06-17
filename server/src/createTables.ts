import { connection } from "./config/mysql.config";

//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database

const createTables = async () => {
    try {
        const pool = await connection();

        if (!pool) {
            throw new Error('Failed to get database connection pool');
        }

        await pool.execute(`CREATE TABLE IF NOT EXISTS companies (
            companyId INT NOT NULL AUTO_INCREMENT,
            companyName VARCHAR(255) DEFAULT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (companyId)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacherId INT NOT NULL AUTO_INCREMENT,
            firstname VARCHAR(255) DEFAULT NULL,
            lastname VARCHAR(255) DEFAULT NULL,
            teacherEmail VARCHAR(255) DEFAULT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacherId)
        )`);

        await pool.execute(`CREATE TABLE IF NOT EXISTS projects (
            projectId INT NOT NULL AUTO_INCREMENT,
            projectName VARCHAR(255) DEFAULT NULL,
            projectDesc TEXT DEFAULT NULL,
            teacherId INT DEFAULT NULL,
            companyId INT DEFAULT NULL,
            projectStatus VARCHAR(255) DEFAULT NULL,
            projectUrl VARCHAR(255) DEFAULT NULL,         
            start_date DATE DEFAULT NULL,
            end_date DATE DEFAULT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (projectId),
            FOREIGN KEY (teacherId) REFERENCES teachers(teacherId),
            FOREIGN KEY (companyId) REFERENCES companies(companyId)
        
            
        )`);
        console.log('Tables created successfully');
    } catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    }
};

export default createTables;