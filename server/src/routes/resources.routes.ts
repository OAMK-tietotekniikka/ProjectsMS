import { Router } from "express";   
import { createResource, getResources, updateResource } from "../controllers/resources.controller";
import { authenticated, authorizeRoles } from '../passportMiddleware';


const resourcesRouter = Router();


resourcesRouter.route('/')
    .get(authenticated, authorizeRoles('teacher', 'student'), getResources)
    .post(authenticated, authorizeRoles('teacher'), createResource);

resourcesRouter.route('/:resource_id')
    .put(authenticated, authorizeRoles('teacher', 'student'), updateResource);


export default resourcesRouter;


