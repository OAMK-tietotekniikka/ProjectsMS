import { Router } from "express";
import { createProject, getProjects, updateProject, deleteProject, getStudentProjects, createStudentProject } from "../controllers/projects.controller";


const projectsRouter = Router();

projectsRouter.route('/')
  .get(getProjects)
  .post(createProject);

projectsRouter.route('/:project_id')
  .put(updateProject)
  .delete(deleteProject);

projectsRouter.route('/student')
  .get(getStudentProjects)
  .post(createStudentProject);

export default projectsRouter;


