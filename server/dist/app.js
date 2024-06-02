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
class App {
    constructor(port = process.env.PORT || 8080) {
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
        this.app.use('/students', students_routes_1.default); // This is a placeholder for the routes
        this.app.get('/', (req, res) => res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Hello World, I am using OpenShift!!!')));
        this.app.all('*', (req, res) => res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}
exports.App = App;
