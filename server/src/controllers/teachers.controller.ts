import { Request, Response } from "express";
import { Teacher } from "../interface/teacher";
import pool from "../config/mysql.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import { ResultSetHeader, RowDataPacket, FieldPacket, OkPacket } from "mysql2";
import { QUERY } from "../query/teachers.query";
import dotenv from "dotenv";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getTeachers = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_TEACHERS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Teachers fetched successfully', result[0]));
    }
    catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));
    } finally {
        if (connection) connection.release();
    }
};

export const getTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_TEACHER, [req.params.teacher_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Teacher fetched successfully', result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Teacher not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));
    }
};

export const createTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let teacher: Teacher = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.CREATE_TEACHER, Object.values(teacher));
        teacher = { teacher_id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Teacher created successfully', teacher));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating teacher'));

    }
};

export const updateTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let teacher: Teacher = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_TEACHERS, [req.params.teacher_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            const result: ResultSet = await pool.query(QUERY.UPDATE_TEACHER, [...Object.values(teacher), req.params.teacher_id]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Teacher updated', { ...teacher, id: req.params.teacher_id }));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Teacher not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating teacher'));
    }
};

export const getTeachersByCompany = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_TEACHERS_BY_COMPANY, [req.params.company_name]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Teachers by company fetched successfully', result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Teachers by company not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));

    } finally {
        if (connection) connection.release();
    }
};

export const authenticateTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    dotenv.config();
    const { email, password } = req.body;
    let connection: any;
    try {
        connection = await pool.getConnection();
        const [rows]: [RowDataPacket[], any] = await pool.query(QUERY.SELECT_TEACHER_BY_EMAIL, [email]);
        if (rows.length > 0) {
            const teacher = rows[0];
            // Directly comparing the plaintext passwords
            if (password === teacher.password) {
                // Generate JWT token
                const token = jwt.sign(
                    {
                        teacher_id: teacher.teacher_id,
                        email: teacher.email,
                        role: 'teacher'
                    },
                    process.env.JWT_SECRET ?? 'default-secret',
                    { expiresIn: '1h' }
                );
                console.log(`TeacterId: ${teacher.teacher_id} authenticated successfully.`)
                return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, 'Teacher authenticated', { token, teacherId: teacher.teacher_id }));
            } else {
                return res.status(Code.UNAUTHORIZED)
                    .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid password'));
            }
        } else {
            return res.status(Code.UNAUTHORIZED)
                .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid user email'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while authenticating teacher'));
    } finally {
        if (connection) connection.release();
    }
};


//  using bcrypt to compare the hashed password
// export const authenticateTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
//     dotenv.config();
//     const { email, password } = req.body;
//     let connection: any;
//     try {
//         connection = await pool.getConnection();
//         const [rows]: [RowDataPacket[], any] = await pool.query(QUERY.SELECT_TEACHER_BY_EMAIL, [email] );
//         if (rows.length > 0) {
//             const teacher = rows[0];
//             const passwordMatch = await bcrypt.compare(password, teacher.password);
//             if (passwordMatch) {
//                 // Generate JWT token
//                 const token = jwt.sign(
//                     { teacher_id: teacher.teacher_id, email: teacher.email },
//                     process.env.JWT_SECRET ?? 'default-secret', // Make sure to have a JWT_SECRET in your .env
//                     { expiresIn: '1h' } // Token expires in 1 hour
//                 );
//                 return res.status(Code.OK)
//                     .send(new HttpResponse(Code.OK, Status.OK, 'Teacher authenticated', { token }));
//             } else {
//                 return res.status(Code.UNAUTHORIZED)
//                     .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid credentials'));
//             }
//         } else {
//             return res.status(Code.UNAUTHORIZED)
//                 .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid credentials'));
//         }
//     } catch (error: unknown) {
//         console.error(`[${new Date().toLocaleDateString()}] ${error}`);
//         return res.status(Code.INTERNAL_SERVER_ERROR)
//             .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while authenticating teacher'));
//     } finally {
//         if (connection) connection.release();
//     }
// };