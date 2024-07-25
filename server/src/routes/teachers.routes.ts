import { Router } from "express";   
import { getTeachers, createTeacher, getTeacher, updateTeacher, getTeachersByCompany, authenticateTeacher } from "../controllers/teachers.controller";

const teachersRouter = Router();

teachersRouter.route('/')
    .get(getTeachers)
    .post(createTeacher);

teachersRouter.route('/login')
    .post(authenticateTeacher);

teachersRouter.route('/:teacher_id')
    .get(getTeacher)
    .put(updateTeacher)

teachersRouter.route('/company/:company_name')
    .get(getTeachersByCompany);

export default teachersRouter;