"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teachers_controller_1 = require("../controllers/teachers.controller");
const teachersRouter = (0, express_1.Router)();
teachersRouter.route('/')
    .get(teachers_controller_1.getTeachers)
    .post(teachers_controller_1.createTeacher);
teachersRouter.route('/:teacher_id')
    .put(teachers_controller_1.updateTeacher);
teachersRouter.route('/:email')
    .get(teachers_controller_1.getTeacher);
teachersRouter.route('/company/:company_name')
    .get(teachers_controller_1.getTeachersByCompany);
exports.default = teachersRouter;
