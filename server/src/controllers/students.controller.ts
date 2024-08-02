import { Request, Response } from "express";
import { Student } from "../interface/student";
import pool from "../config/mysql.config";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import { ResultSetHeader, RowDataPacket, FieldPacket, OkPacket } from "mysql2";
import { QUERY } from "../query/students.query";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getStudents = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_STUDENTS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Students fetched successfully', result[0]));
    }
    catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    } finally {
        if (connection) connection.release();
    }
};

export const getStudent = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_STUDENT, [req.params.student_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Student fetched successfully', result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Student not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));

    }
};


export const createStudent = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let student: Student = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.CREATE_STUDENT, Object.values(student));
        student = { student_id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Students created successfully', student));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));

    }
};

export const updateStudent = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let student: Student = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_STUDENT, [req.params.student_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            const result: ResultSet = await pool.query(QUERY.UPDATE_STUDENT, [...Object.values(student), req.params.student_id]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Student updated', { ...student, id: req.params.student_id }));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Student not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));

    }
};

export const deleteStudent = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_STUDENT, [req.params.student_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            const result: ResultSet = await pool.query(QUERY.DELETE_STUDENT, [req.params.student_id]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Student deleted',));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Student not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));

    }
};


export const authenticateStudent = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    dotenv.config();
    const { email, password } = req.body;
    let connection: any;
    try {
        connection = await pool.getConnection();
        const [rows]: [RowDataPacket[], any] = await pool.query(QUERY.SELECT_STUDENT_BY_EMAIL, [email]);
        if (rows.length > 0) {
            const student = rows[0];
            // Directly comparing the plaintext passwords
            if (password === student.password) {
                // Generate JWT token
                const token = jwt.sign(
                    {
                        student_id: student.student_id,
                        email: student.email,
                        role: 'student'
                    },
                    process.env.JWT_SECRET ?? 'default-secret',
                    { expiresIn: '1h' }
                );
                return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, 'Student authenticated', { token, studentId: student.student_id }));
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
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while authenticating student'));
    } finally {
        if (connection) connection.release();
    }
};