import { Request, Response } from 'express';
import { Project } from '../interface/project';
import { StudentProject } from '../interface/studentProject';
import pool from "../config/mysql.config";
import { QUERY } from '../query/projects.query';
import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';
import { HttpResponse } from '../domain/response';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getProjects = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PROJECTS);
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Projects fetched successfully', result[0]));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching projects'));
    } finally {
        if (connection) connection.release();
    }
};

export const createProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project: Project = { ...req.body };
    let connection: any;
    project.start_date = new Date(formatDate(new Date(project.start_date)));
    project.end_date = new Date(formatDate(new Date(project.end_date)));

    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.CREATE_PROJECT, Object.values(project));
        project = { project_id: (result[0] as ResultSetHeader).insertId, ...req.body };
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Project created successfully', project));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating project'));
    } finally {
        if (connection) connection.release();
    }
};

export const updateProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project: Project = { ...req.body };
    project.start_date = new Date(formatDate(new Date(project.start_date)));
    project.end_date = new Date(formatDate(new Date(project.end_date)));
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.UPDATE_PROJECT, [...Object.values(project), req.params.project_id]);
        project = { project_id: req.params.project_id, ...req.body };
        return res.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Project updated successfully', project));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating project'));
    } finally {
        if (connection) connection.release();
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_PROJECT, [req.params.project_id]);
        if ((result[0] as Array<ResultSet>).length > 0) {
            const result: ResultSet = await pool.query(QUERY.DELETE_PROJECT, [req.params.project_id]);
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Project deleted successfully'));
        } else {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Project not found'));
        }
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting project'));
    }
};

export const getStudentProjects = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.SELECT_STUDENT_PROJECTS);
        if ((result[0] as Array<ResultSet>).length === 0) {
            return res.status(Code.NOT_FOUND)
                .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'No student_projects found'));
        } else
            return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'Student projects fetched successfully', result[0]));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching student projects'));
    } finally {
        if (connection) connection.release();
    }
};

export const createStudentProject = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let studentProject: StudentProject = { ...req.body };
    let projectNumber: number;
    let connection: any;
    try {
        connection = await pool.getConnection();
        const previousProjects: ResultSet = await pool.query(QUERY.SELECT_STUDENT_PROJECTS_BY_STUDENT_ID, [studentProject.student_id]);
        if ((previousProjects[0] as Array<ResultSet>).length === 0) {
            projectNumber = 1;
        } else {
            projectNumber = (previousProjects[0] as Array<ResultSet>).length + 1;
        }
        studentProject.project_number = projectNumber;
        const result: ResultSet = await pool.query(QUERY.CREATE_STUDENT_PROJECT, Object.values(studentProject));
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Student project created successfully', studentProject));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating student project'));
    } finally {
        if (connection) connection.release();
    }
};

export const addProjectNote = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection: any;
    try {
        connection = await pool.getConnection();
        const result: ResultSet = await pool.query(QUERY.INSERT_PROJECT_NOTE, [req.params.project_id, req.body.note, req.body.document_path]);
        return res.status(Code.CREATED)
            .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Project note added successfully', req.body));
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while adding project note'));
    } finally {
        if (connection) connection.release();
    }
}
