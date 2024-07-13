import { Router } from "express";   
import { getProject, createProject, getProjects, updateProject,deleteProject , addProjectNote} from "../controllers/projects.controller";


const projectsRouter = Router();


projectsRouter.route('/')
  .get(getProjects)
  .post(createProject);

projectsRouter.route('/:project_id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

projectsRouter.route('/:project_id/addNote')
    .post(addProjectNote);


export default projectsRouter;


