import { Router } from "express";   
import { createResource, getResources, updateResource } from "../controllers/resources.controller";


const resourcesRouter = Router();

resourcesRouter.route('/')
    .get(getResources)
    .post(createResource);

resourcesRouter.route('/:resource_id')
    .put(updateResource);


export default resourcesRouter;


