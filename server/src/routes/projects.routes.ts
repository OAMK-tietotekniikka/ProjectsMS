import { Router } from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getStudentProjects,
  createStudentProject,
  addProjectNote,
  getProjectNotes
} from "../controllers/projects.controller";


const projectsRouter = Router();

projectsRouter.route('/')
  .get(getProjects)
  .post(createProject);

projectsRouter.route('/:project_id')
  .put(updateProject)
  .delete(deleteProject);

projectsRouter.route('/:project_id/addNote')
  .post(addProjectNote);

projectsRouter.route('/student')
  .get(getStudentProjects)
  .post(createStudentProject);

projectsRouter.route('/:project_id/notes')
  .get(getProjectNotes)

export default projectsRouter;


