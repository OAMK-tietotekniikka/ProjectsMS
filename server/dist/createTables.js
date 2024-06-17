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
        yield pool.execute(`CREATE TABLE IF NOT EXISTS companies (
            companyId INT NOT NULL AUTO_INCREMENT,
            companyName VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (companyId)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS teachers (
            teacherId INT NOT NULL AUTO_INCREMENT,
            firstname VARCHAR(255) DEFAULT NULL,
            lastname VARCHAR(255) DEFAULT NULL,
            teacherEmail VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (teacherId)
        )`);
        yield pool.execute(`CREATE TABLE IF NOT EXISTS projects (
            projectId INT NOT NULL AUTO_INCREMENT,
            projectName VARCHAR(255) DEFAULT NULL,
            projectDesc TEXT DEFAULT NULL,
            teacherId INT DEFAULT NULL,
            companyId INT DEFAULT NULL,
            projectStatus VARCHAR(255) DEFAULT NULL,
            projectUrl VARCHAR(255) DEFAULT NULL,         
            start_date DATE DEFAULT NULL,
            end_date DATE DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (projectId),
            CONSTRAINT (teacherId) FOREIGN KEY (teacherId) REFERENCES teachers (teacherId),
            CONSTRAINT (companyId) FOREIGN KEY (companyId) REFERENCES companies (companyId)
        )`);
        console.log('Tables created successfully');
    }
    catch (error) {
        console.error(`Table creation failed: [${new Date().toLocaleDateString()}] ${error}`);
    }
});
exports.default = createTables;