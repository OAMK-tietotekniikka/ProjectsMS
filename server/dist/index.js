"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://cop-client-cop-ms.2.rahtiapp.fi', 'http://localhost:5173', 'https://pm-app-client-pm-app-deploy.2.rahtiapp.fi', 'http://localhost:8080', 'http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/', (req, res) => {
    res.json({ message: 'Hello World, I am using OpenShift!!!' });
});
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
