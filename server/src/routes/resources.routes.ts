import { Router } from "express";   
import { createResource, getResources } from "../controllers/resources.controller";


const resourcesRouter = Router();


resourcesRouter.route('/')
    .get(getResources)
    .post(createResource);

resourcesRouter.route('/:project_id')


export default resourcesRouter;


