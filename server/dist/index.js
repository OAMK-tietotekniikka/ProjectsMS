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
const app_1 = require("./app");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new app_1.App();
    app.listen();
});
start();
// import express, {Express, Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// const app: Express = express();
// const port: string | number = process.env.PORT || 8080;
// app.use(bodyParser.json());
// app.use(cors({
//     origin: ['https://cop-client-cop-ms.2.rahtiapp.fi', 'http://localhost:5173', 'https://pm-app-client-pm-app-deploy.2.rahtiapp.fi','http://localhost:8080', 'http://localhost:5000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.get('/', (req: Request, res: Response) => {
//     res.json({ message: 'Hello World, I am using OpenShift!!!' });
// });
// app.listen(port, () => {
//     console.log('Server is running on port: ' + port);
//     }
// );
