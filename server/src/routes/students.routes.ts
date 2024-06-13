import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent } from "../controllers/students.controller";

const studentsRouter = Router();

studentsRouter.route('/')
    .get(getStudents)
    .post(createStudent);

studentsRouter.route('/:studentId')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);




export default studentsRouter;