import { Router } from "express";   
import { createStudent, getStudents,getStudent,updateStudent,deleteStudent } from "../controllers/students.controller";

const studentsRouter = Router();

studentsRouter.route('/')
    .get(getStudents)
    .post(createStudent);

//studentsRouter.route('/:studentlogin')



studentsRouter.route('/:student_id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);


export default studentsRouter;