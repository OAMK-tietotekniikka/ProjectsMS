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
exports.updateResource = exports.createResource = exports.getResources = void 0;
const mysql_config_1 = require("../config/mysql.config");
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const resources_query_1 = require("../query/resources.query");
const getResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(resources_query_1.QUERY.SELECT_RESOURCES);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Resources fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching resources'));
    }
});
exports.getResources = getResources;
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource = Object.assign({}, req.body);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const result = yield pool.query(resources_query_1.QUERY.CREATE_RESOURCE, Object.values(resource));
        resource = Object.assign({ resource_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Company created successfully', resource));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating company'));
    }
});
exports.createResource = createResource;
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let resource = Object.assign({}, req.body);
    console.log(resource);
    console.log(req.params.resource_id);
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const findResource = yield pool.query(resources_query_1.QUERY.SELECT_RESOURCE, [req.params.resource_id]);
        if (findResource[0].length === 0) {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Resource not found for the provided id'));
        }
        else {
            const result = yield pool.query(resources_query_1.QUERY.UPDATE_RESOURCE, [
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
