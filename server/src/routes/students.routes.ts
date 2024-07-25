import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent,authenticateStudent } from "../controllers/students.controller";

const studentsRouter = Router();

studentsRouter.route('/')
    .get(getStudents)
    .post(createStudent);

studentsRouter.route('/login')
    .post(authenticateStudent);

studentsRouter.route('/:student_id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);


export default studentsRouter;