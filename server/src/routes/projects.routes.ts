import { Router } from "express";   
import { getProject, createProject, getProjects, updateProject,deleteProject } from "../controllers/projects.controller";


const projectsRouters = Router();


projectsRouters.route('/')
  .get(getProjects)
  .post(createProject);

projectsRouters.route('/:projectId')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);


export default projectsRouters;


