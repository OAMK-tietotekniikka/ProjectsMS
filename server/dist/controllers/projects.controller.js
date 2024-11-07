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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectNote = exports.getProjectNotes = exports.addProjectNote = exports.createStudentProject = exports.getStudentProjects = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const mysql_config_1 = __importDefault(require("../config/mysql.config"));
const projects_query_1 = require("../query/projects.query");
const resources_query_1 = require("../query/resources.query");
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
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.SELECT_PROJECTS);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Projects fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching projects'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project = Object.assign({}, req.body);
    let connection;
    project.start_date = new Date(formatDate(new Date(project.start_date)));
    project.end_date = new Date(formatDate(new Date(project.end_date)));
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.CREATE_PROJECT, Object.values(project));
        project = Object.assign({ project_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Project created successfully', project));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating project'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let project = Object.assign({}, req.body);
    project.start_date = new Date(formatDate(new Date(project.start_date)));
    project.end_date = new Date(formatDate(new Date(project.end_date)));
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.UPDATE_PROJECT, [...Object.values(project), req.params.project_id]);
        project = Object.assign({ project_id: req.params.project_id }, req.body);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Project updated successfully', project));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating project'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.SELECT_PROJECT, [req.params.project_id]);
        if (result[0].length > 0) {
            const result = yield mysql_config_1.default.query(projects_query_1.QUERY.DELETE_PROJECT_BY_ID, [req.params.project_id]);
            const result2 = yield mysql_config_1.default.query(projects_query_1.QUERY.DELETE_STUDENT_PROJECT_BY_PROJECT_ID, [req.params.project_id]);
            const result3 = yield mysql_config_1.default.query(projects_query_1.QUERY.DELETE_PROJECT_NOTES_BY_PROJECT_ID, [req.params.project_id]);
            const result4 = yield mysql_config_1.default.query(resources_query_1.R_QUERY.DELETE_RESOURCE, [req.params.project_id]);
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
const getStudentProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.SELECT_STUDENT_PROJECTS);
        if (result[0].length === 0) {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'No student_projects found'));
        }
        else
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Student projects fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching student projects'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getStudentProjects = getStudentProjects;
const createStudentProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let studentProject = Object.assign({}, req.body);
    let projectNumber;
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const previousProjects = yield mysql_config_1.default.query(projects_query_1.QUERY.SELECT_STUDENT_PROJECTS_BY_STUDENT_ID, [studentProject.student_id]);
        if (previousProjects[0].length === 0) {
            projectNumber = 1;
        }
        else {
            projectNumber = previousProjects[0].length + 1;
        }
        studentProject.project_number = projectNumber;
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.CREATE_STUDENT_PROJECT, Object.values(studentProject));
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Student project created successfully', studentProject));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating student project'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.createStudentProject = createStudentProject;
const addProjectNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.INSERT_PROJECT_NOTE, [req.params.project_id, req.body.note, req.body.document_path, req.body.created_by]);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Project note added successfully', req.body));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while adding project note'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.addProjectNote = addProjectNote;
const getProjectNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.SELECT_PROJECT_NOTES, [req.params.project_id]);
        if (result[0].length === 0) {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'No notes found'));
        }
        else
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Notes fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching notes'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getProjectNotes = getProjectNotes;
const deleteProjectNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
    let connection;
    const { note_id, project_id } = req.params;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(projects_query_1.QUERY.DELETE_PROJECT_NOTE, [note_id, project_id]);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Note deleted successfully'));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting note'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.deleteProjectNote = deleteProjectNote;
// export const deleteProjectNote = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
//     console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[1]}`);
//     let connection: any;
//     try {
//         connection = await pool.getConnection();
//         const result: ResultSet = await pool.query(QUERY.DELETE_PROJECT_NOTE, [req.params.note_id]);
//         return res.status(Code.OK)
//             .send(new HttpResponse(Code.OK, Status.OK, 'Note deleted successfully'));
//     } catch (error: unknown) {
//         console.error(`[${new Date().toLocaleString()}] ${error}`);
//         return res.status(Code.INTERNAL_SERVER_ERROR)
//             .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting note'));
//     } finally {
//         if (connection) connection.release();
//     }
// }
