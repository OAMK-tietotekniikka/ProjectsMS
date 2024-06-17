"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const code_enum_1 = require("./enum/code.enum");
const response_1 = require("./domain/response");
const status_enum_1 = require("./enum/status.enum");
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const createTables_1 = __importDefault(require("./createTables"));
//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database
//Comment out when working with development/feature branch
(0, createTables_1.default)();
class App {
    constructor(port = process.env.SERVER_PORT || 8080) {
        this.port = port;
        this.APPLICATION_RUNNING = 'Application running on: ';
        this.ROUTE_NOT_FOUND = 'Route does not exist!';
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.info(`${this.APPLICATION_RUNNING} ${ip_1.default.address()}:${this.port}`);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/students', students_routes_1.default); // This is a students route.
        this.app.use('/projects', projects_routes_1.default); // This is a projects route.
        this.app.get('/', (req, res) => res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Hello World, I am using OpenShift!!!')));
        this.app.all('*', (req, res) => res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}
exports.App = App;
