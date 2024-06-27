import { Router } from "express";   
import { getProject, createProject, getProjects, updateProject,deleteProject } from "../controllers/projects.controller";


const projectsRouter = Router();


projectsRouter.route('/')
  .get(getProjects)
  .post(createProject);

projectsRouter.route('/:project_id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);


export default projectsRouter;


