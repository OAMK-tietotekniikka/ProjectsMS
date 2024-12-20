"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_controller_1 = require("../controllers/students.controller");
const studentsRouter = (0, express_1.Router)();
studentsRouter.route('/')
    .get(students_controller_1.getStudents)
    .post(students_controller_1.createStudent);
studentsRouter.route('/:student_id')
    .put(students_controller_1.updateStudent)
    .delete(students_controller_1.deleteStudent);
studentsRouter.route('/:email')
    .get(students_controller_1.getStudent);
exports.default = studentsRouter;
