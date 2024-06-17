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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const mysql_config_1 = require("../config/mysql.config");
const projects_query_1 = require("../query/projects.query");
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(projects_query_1.QUERY.SELECT_PROJECTS);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Projects fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching projects'));
    }
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(projects_query_1.QUERY.SELECT_PROJECT, [req.params.projectId]);
        if (result[0].length > 0) {
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Project fetched successfully', result[0]));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Project not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching project'));
    }
});
exports.getProject = getProject;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project = Object.assign({}, req.body);
    project.start_date = new Date(formatDate(new Date(project.start_date)));
    project.end_date = new Date(formatDate(new Date(project.end_date)));
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(projects_query_1.QUERY.CREATE_PROJECT, Object.values(project));
        project = Object.assign({ project_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Project created successfully', project));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating project'));
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(projects_query_1.QUERY.UPDATE_PROJECT, [...Object.values(project), req.params.project_id]);
        project = Object.assign({ project_id: req.params.project_id }, req.body);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Project updated successfully', project));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating project'));
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(projects_query_1.QUERY.SELECT_PROJECT, [req.params.project_id]);
        if (result[0].length > 0) {
            const result = yield pool.query(projects_query_1.QUERY.DELETE_PROJECT, [req.params.project_id]);
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Project deleted successfully'));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Project not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting project'));
    }
});
exports.deleteProject = deleteProject;
