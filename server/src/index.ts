
import { App } from './app';

const start = () : void => {
    const app = new App();
    app.listen();
}

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

