import cors from "cors";
import express, { Application,Request,Response } from "express";
import ip from 'ip';
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import studentsRouter from "./routes/students.routes";
import projectsRouter from "./routes/projects.routes";
import createTables from "./createTables";

//This is for the creation of tables in the CSC OpenShift Rahti2 MySql database
//Comment out when working with development/feature branch
createTables();

export class App{
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'Application running on: ';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist!'; 
    
    constructor(private readonly port: (number | string)= process.env.SERVER_PORT || 8080){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    listen():void{
        this.app.listen(this.port, () => {
            console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
        });
    
    }
    
    private middlewares(): void{
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json());
    }

    private routes(): void{
        this.app.use('/students', studentsRouter); // This is a students route.
        this.app.use('/projects', projectsRouter); // This is a projects route.
        this.app.get('/', (req:Request, res:Response) => res.status(Code.OK).send(new HttpResponse(Code.OK,Status.OK, 'Hello World, I am using OpenShift!!!')));
        this.app.all('*', (req:Request, res:Response) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND,Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
    
}