import { Router } from "express";   
import { getTeachers, createTeacher, getTeacher, updateTeacher, getTeachersByCompany } from "../controllers/teachers.controller";
import { verifyToken } from "../entraTokenValidation";


const teachersRouter = Router();

teachersRouter.route('/')
    .get(getTeachers)
    .post(createTeacher);

teachersRouter.route('/:teacher_id')
    .put(updateTeacher)

teachersRouter.route('/:email')
    .get(getTeacher);

teachersRouter.route('/company/:company_name')
    .get(getTeachersByCompany);

export default teachersRouter;