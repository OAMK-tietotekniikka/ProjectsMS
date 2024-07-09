import { Request, Response } from "express";
import { Company } from "../interface/company";
import { connection } from "../config/mysql.config";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import { ResultSetHeader, RowDataPacket, FieldPacket, OkPacket } from "mysql2";
import { QUERY } from "../query/companies.query";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getCompanies = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_COMPANIES);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Companies fetched successfully', result[0]));
    }
    catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching companies'));

    }
};

export const createCompany = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let company: { company_name: string } = { company_name: req.body.company_name };
    console.log(req.body);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE_COMPANY, [req.body.company_name]);
        company = { company_id: (result[0] as ResultSetHeader).insertId, ...req.body };
        console.log(company);
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Company created successfully', company));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating company'));

    }

};

export const getFavoCompanies = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_FAVO_COMPANIES, [[req.params.teacher_id]]);
        console.log(result);
        if ((result[0] as Array<ResultSet>).length > 0) {
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Favourite companies fetched successfully', result[0]));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Favourite companies not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching favourite companies'));
    }
};

export const addFavoCompany = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    const favo = { ...req.body };
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.ADD_FAVO_COMPANY, Object.values(favo));
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Favourite company added successfully', favo));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while adding favourite company'));
    }
};

export const deleteFavoCompany = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.DELETE_FAVO_COMPANY, [req.params.teacher_id]);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Favourite companies deleted successfully', req.params.company_id));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting favourite company'));
    }
};