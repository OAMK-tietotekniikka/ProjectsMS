import { Request, Response } from "express";
import { Resource } from "../interface/resource";
import pool from "../config/mysql.config";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from "../domain/response";
import { ResultSetHeader, RowDataPacket, FieldPacket, OkPacket } from "mysql2";
import { R_QUERY } from "../query/resources.query";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getResources = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(R_QUERY.SELECT_RESOURCES);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Resources fetched successfully', result[0]));
    }
    catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching resources'));

    } finally {
        if (connection) connection.release();
    }
};

export const createResource = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource: Resource = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(R_QUERY.CREATE_RESOURCE, Object.values(resource));
        resource = { resource_id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Company created successfully', resource));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating company'));
    } finally {
        if (connection) connection.release();
    }
};

export const updateResource = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource: Resource = { ...req.body };
    let connection: any;
    try {
        connection = await pool.getConnection();
        const findResource: ResultSet = await pool.query(R_QUERY.SELECT_RESOURCE, [req.params.resource_id]);
        if ((findResource[0] as RowDataPacket[]).length === 0) {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Resource not found for the provided id'));
        } else {
            const result: ResultSet = await pool.query(R_QUERY.UPDATE_RESOURCE, [
                resource.teacher_id,
                resource.total_resources,
                resource.used_resources,
                resource.study_year,
                req.params.resource_id
            ]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Resource updated successfully', resource));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating resource'));
    }
};
