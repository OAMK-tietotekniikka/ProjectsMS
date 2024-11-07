import { Router } from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getStudentProjects,
  createStudentProject,
  addProjectNote,
  getProjectNotes,
  deleteProjectNote
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
  //.delete(authenticated, authorizeRoles('teacher', 'student'), deleteProjectNote);
projectsRouter.route('/:project_id/notes/:note_id')
  .delete(deleteProjectNote);

export default projectsRouter;


