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
exports.updateResource = exports.createResource = exports.getResources = void 0;
const mysql_config_1 = __importDefault(require("../config/mysql.config"));
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const resources_query_1 = require("../query/resources.query");
const getResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(resources_query_1.R_QUERY.SELECT_RESOURCES);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Resources fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching resources'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getResources = getResources;
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource = Object.assign({}, req.body);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(resources_query_1.R_QUERY.CREATE_RESOURCE, Object.values(resource));
        resource = Object.assign({ resource_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Resource created successfully', resource));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating resource'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.createResource = createResource;
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource = Object.assign({}, req.body);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const findResource = yield mysql_config_1.default.query(resources_query_1.R_QUERY.SELECT_RESOURCE, [req.params.resource_id]);
        if (findResource[0].length === 0) {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Resource not found for the provided id'));
        }
        else {
            const result = yield mysql_config_1.default.query(resources_query_1.R_QUERY.UPDATE_RESOURCE, [
                resource.teacher_id,
                resource.total_resources,
                resource.used_resources,
                resource.study_year,
                req.params.resource_id
            ]);
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Resource updated successfully', resource));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating resource'));
    }
});
exports.updateResource = updateResource;
