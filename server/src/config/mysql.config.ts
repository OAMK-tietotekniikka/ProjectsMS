import { createPool } from "mysql2/promise";
import dotenv from "dotenv";


dotenv.config();

export const connection = async () => {
    try {
        const pool = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 10
    });
        return pool;

    } catch (error) {
        console.error(`Connection failed: [${new Date().toLocaleDateString()}] ${error}`);
        throw error;
    }
}