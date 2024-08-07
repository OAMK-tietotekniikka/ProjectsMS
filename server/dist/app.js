"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const code_enum_1 = require("./enum/code.enum");
const response_1 = require("./domain/response");
const status_enum_1 = require("./enum/status.enum");
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const projects_routes_1 = __importDefault(require("./routes/projects.routes"));
const companies_routes_1 = __importDefault(require("./routes/companies.routes"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const resources_routes_1 = __importDefault(require("./routes/resources.routes"));
const email_routes_1 = __importDefault(require("./routes/email.routes"));
const passportMiddleware_1 = __importDefault(require("./passportMiddleware"));
//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database
//Comment out when working with development/feature branch
//createTables();
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
            console.info(`${this.APPLICATION_RUNNING} port: ${this.port}`);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use(express_1.default.json());
        this.app.use(passportMiddleware_1.default.initialize());
    }
    routes() {
        this.app.use('/students', students_routes_1.default); // This is a students route.
        this.app.use('/projects', projects_routes_1.default); // This is a projects route.
        this.app.use('/companies', companies_routes_1.default);
        this.app.use('/teachers', teachers_routes_1.default);
        this.app.use('/resources', resources_routes_1.default);
        this.app.use('/email', email_routes_1.default);
        this.app.get('/', (req, res) => res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Hello World, I am using OpenShift!!!')));
        this.app.all('*', (req, res) => res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}
exports.App = App;
