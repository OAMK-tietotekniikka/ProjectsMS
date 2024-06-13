import { Request, Response } from 'express';
import { Project } from '../interface/project';
import { connection } from '../config/mysql.config';
import { QUERY } from '../query/projects.query';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { HttpResponse } from '../domain/response';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

type ResultSet = [RowDataPacket[]| RowDataPacket[][]| OkPacket| OkPacket[]| ResultSetHeader, FieldPacket[]];


export const getProjects = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PROJECTS);
        return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Projects fetched successfully', result[0]));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching projects'));
    }
};

export const getProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PROJECT , [req.params.projectId]);
        if((result[0] as Array<ResultSet>).length > 0){
        return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Project fetched successfully', result[0]));
    }else{
        return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Project not found'));
    }
}catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching project'));
        
    }
};


export const createProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project: Project = {...req.body};
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.CREATE_PROJECT, Object.values(project));
        project = { projectId: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
        .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Project created successfully', project));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating project'));
    }
};

export const updateProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project: Project = {...req.body};
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.UPDATE_PROJECT, [...Object.values(project), req.params.projectId]);
        project = { projectId: req.params.projectId, ...req.body };
        return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Project updated successfully', project));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating project'));
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    try {
        const pool = await connection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PROJECT, [req.params.projectId]);
        if ((result[0] as Array<ResultSet>).length >0) {
            const result: ResultSet = await pool.query(QUERY.DELETE_PROJECT, [req.params.projectId]);
            return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Project deleted successfully'));
        }else{
        return res.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Project not found'));
    }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting project'));
    }
};