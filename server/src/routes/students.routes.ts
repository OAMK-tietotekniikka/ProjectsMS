import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent } from "../controllers/students.controller";

const studentsRouter = Router();

studentsRouter.route('/')
    .get(getStudents)
    .post(createStudent);

studentsRouter.route('/:student_id')
    .put(updateStudent)
    .delete(deleteStudent);

studentsRouter.route('/:email')
    .get(getStudent);

export default studentsRouter;