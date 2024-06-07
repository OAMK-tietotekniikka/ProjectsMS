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
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const code_enum_1 = require("./enum/code.enum");
const response_1 = require("./domain/response");
const status_enum_1 = require("./enum/status.enum");
const students_routes_1 = __importDefault(require("./routes/students.routes"));
const mysql_config_1 = require("./config/mysql.config");
const testDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, mysql_config_1.connection)();
        const [rows] = yield pool.execute('SELECT NOW() as solution');
        console.log('Current database time:', rows[0]['NOW()']);
    }
    catch (error) {
        console.error(`Connection failed: [${new Date().toLocaleDateString()}] ${error}`);
        throw error;
    }
});
testDatabaseConnection();
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
        this.app.use('/students', students_routes_1.default); // This is a placeholder for the routes
        this.app.get('/', (req, res) => res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Hello World, I am using OpenShift!!!')));
        this.app.all('*', (req, res) => res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
}
exports.App = App;
