"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_controller_1 = require("../controllers/students.controller");
const passportMiddleware_1 = require("../passportMiddleware");
const studentsRouter = (0, express_1.Router)();
studentsRouter.route('/')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), students_controller_1.getStudents)
    .post(students_controller_1.createStudent);
studentsRouter.route('/login')
    .post(students_controller_1.authenticateStudent);
studentsRouter.route('/:student_id')
    .get(students_controller_1.getStudent)
    .put(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), students_controller_1.updateStudent)
    .delete(students_controller_1.deleteStudent);
exports.default = studentsRouter;
