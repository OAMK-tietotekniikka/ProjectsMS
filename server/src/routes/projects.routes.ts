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
import { authenticated, authorizeRoles } from '../passportMiddleware';


const projectsRouter = Router();

projectsRouter.route('/')
  .get(authenticated, authorizeRoles('teacher', 'student'), getProjects)
  .post(authenticated, authorizeRoles('student'), createProject);

projectsRouter.route('/:project_id')
  .put(authenticated, authorizeRoles('teacher', 'student'), updateProject)
  .delete(authenticated, authorizeRoles('teacher', 'student'), deleteProject);

projectsRouter.route('/:project_id/addNote')
  .post(authenticated, authorizeRoles('teacher', 'student'), addProjectNote);

projectsRouter.route('/student')
  .get(authenticated, authorizeRoles('teacher', 'student'), getStudentProjects)
  .post(authenticated, authorizeRoles('teacher', 'student'), createStudentProject);

projectsRouter.route('/:project_id/notes')
  .get(authenticated, authorizeRoles('teacher', 'student'), getProjectNotes)
  .delete(authenticated, authorizeRoles('teacher', 'student'), deleteProjectNote);

export default projectsRouter;


