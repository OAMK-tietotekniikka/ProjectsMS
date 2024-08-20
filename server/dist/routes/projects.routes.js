"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../controllers/projects.controller");
const passportMiddleware_1 = require("../passportMiddleware");
const projectsRouter = (0, express_1.Router)();
projectsRouter.route('/')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.getProjects)
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('student'), projects_controller_1.createProject);
projectsRouter.route('/:project_id')
    .put(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.updateProject)
    .delete(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.deleteProject);
projectsRouter.route('/:project_id/addNote')
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.addProjectNote);
projectsRouter.route('/student')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.getStudentProjects)
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.createStudentProject);
projectsRouter.route('/:project_id/notes')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.getProjectNotes)
    .delete(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), projects_controller_1.deleteProjectNote);
exports.default = projectsRouter;
