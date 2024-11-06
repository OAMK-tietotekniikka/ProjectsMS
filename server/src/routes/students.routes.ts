import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent,authenticateStudent } from "../controllers/students.controller";

const studentsRouter = Router();

studentsRouter.route('/')
    .get(getStudents)
    .post(createStudent);

studentsRouter.route('/login')
    .post(authenticateStudent);

studentsRouter.route('/:student_id')
    .put(updateStudent)
    .delete(deleteStudent);

studentsRouter.route('/:email')
    .get(getStudent);

export default studentsRouter;