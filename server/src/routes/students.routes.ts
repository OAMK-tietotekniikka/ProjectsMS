import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent,authenticateStudent } from "../controllers/students.controller";
import { authenticated, authorizeRoles } from '../passportMiddleware';

const studentsRouter = Router();

studentsRouter.route('/')
    .get(authenticated, authorizeRoles('teacher', 'student'), getStudents)
    .post(createStudent);

studentsRouter.route('/login')
    .post(authenticateStudent);

studentsRouter.route('/:student_id')
    .get(getStudent)
    .put(authenticated, authorizeRoles('teacher', 'student'), updateStudent)
    .delete(deleteStudent);


export default studentsRouter;