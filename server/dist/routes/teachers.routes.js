"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teachers_controller_1 = require("../controllers/teachers.controller");
const passportMiddleware_1 = require("../passportMiddleware");
const teachersRouter = (0, express_1.Router)();
teachersRouter.route('/')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), teachers_controller_1.getTeachers)
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher'), teachers_controller_1.createTeacher);
teachersRouter.route('/login')
    .post(teachers_controller_1.authenticateTeacher);
teachersRouter.route('/:teacher_id')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher'), teachers_controller_1.getTeacher)
    .put(teachers_controller_1.updateTeacher);
teachersRouter.route('/company/:company_name')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), teachers_controller_1.getTeachersByCompany);
exports.default = teachersRouter;
