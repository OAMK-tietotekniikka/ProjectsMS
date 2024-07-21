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
exports.deleteFavoCompany = exports.addFavoCompany = exports.getFavoCompanies = exports.createCompany = exports.getCompanies = void 0;
const mysql_config_1 = __importDefault(require("../config/mysql.config"));
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const companies_query_1 = require("../query/companies.query");
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(companies_query_1.QUERY.SELECT_COMPANIES);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Companies fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching companies'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getCompanies = getCompanies;
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let company = { company_name: req.body.company_name };
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(companies_query_1.QUERY.CREATE_COMPANY, [req.body.company_name]);
        company = Object.assign({ company_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Company created successfully', company));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating company'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.createCompany = createCompany;
const getFavoCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(companies_query_1.QUERY.SELECT_FAVO_COMPANIES, [[req.params.teacher_id]]);
        if (result[0].length > 0) {
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Favourite companies fetched successfully', result[0]));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Favourite companies not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching favourite companies'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getFavoCompanies = getFavoCompanies;
const addFavoCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    const favo = Object.assign({}, req.body);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(companies_query_1.QUERY.ADD_FAVO_COMPANY, Object.values(favo));
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Favourite company added successfully', favo));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while adding favourite company'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.addFavoCompany = addFavoCompany;
const deleteFavoCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(companies_query_1.QUERY.DELETE_FAVO_COMPANY, [req.params.teacher_id]);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Favourite companies deleted successfully', req.params.company_id));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while deleting favourite company'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.deleteFavoCompany = deleteFavoCompany;
