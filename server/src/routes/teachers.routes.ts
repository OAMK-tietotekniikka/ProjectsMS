import { Router } from "express";   
import { getTeachers, createTeacher, getTeacher, updateTeacher, getTeachersByCompany } from "../controllers/teachers.controller";

const teachersRouter = Router();

teachersRouter.route('/')
    .get(getTeachers)
    .post(createTeacher);

teachersRouter.route('/:student_id')
    .get(getTeacher)
    .put(updateTeacher)

teachersRouter.route('/company/:company_name')
    .get(getTeachersByCompany);

export default teachersRouter;