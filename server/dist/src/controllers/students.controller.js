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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.getStudents = void 0;
const mysql_config_1 = require("../config/mysql.config");
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const students_query_1 = require("../query/students.query");
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(students_query_1.QUERY.SELECT_STUDENTS);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Students fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    }
});
exports.getStudents = getStudents;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(students_query_1.QUERY.SELECT_STUDENT, [req.params.studentId]);
        if (result[0].length > 0) {
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Student fetched successfully', result[0]));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Student not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    }
});
exports.getStudent = getStudent;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let student = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(students_query_1.QUERY.CREATE_STUDENT, Object.values(student));
        student = Object.assign({ id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Students created successfully', student));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let student = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(students_query_1.QUERY.SELECT_STUDENTS, [req.params.studentId]);
        if (result[0].length > 0) {
            const result = yield pool.query(students_query_1.QUERY.UPDATE_STUDENT, [...Object.values(student), req.params.studentId]);
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Student updated', Object.assign(Object.assign({}, student), { id: req.params.studentId })));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Student not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(students_query_1.QUERY.SELECT_STUDENT, [req.params.studentId]);
        if (result[0].length > 0) {
            const result = yield pool.query(students_query_1.QUERY.DELETE_STUDENT, [req.params.studentId]);
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Student deleted'));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Student not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching students'));
    }
});
exports.deleteStudent = deleteStudent;
