import { Router } from "express";   
import { getTeachers, createTeacher, getTeacher, updateTeacher, getTeachersByCompany, authenticateTeacher } from "../controllers/teachers.controller";
import { authenticated, authorizeRoles } from '../passportMiddleware';


const teachersRouter = Router();

teachersRouter.route('/')
    .get(authenticated, authorizeRoles('teacher', 'student'), getTeachers)
    .post(authenticated, authorizeRoles('teacher'), createTeacher);

teachersRouter.route('/login')
    .post(authenticateTeacher);

teachersRouter.route('/:teacher_id')
    .get(authenticated, authorizeRoles('teacher'), getTeacher)
    .put(updateTeacher)

teachersRouter.route('/company/:company_name')
    .get(authenticated, authorizeRoles('teacher', 'student'), getTeachersByCompany);

export default teachersRouter;