"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../controllers/projects.controller");
const projectsRouter = (0, express_1.Router)();
projectsRouter.route('/')
    .get(projects_controller_1.getProjects)
    .post(projects_controller_1.createProject);
projectsRouter.route('/:project_id')
    .get(projects_controller_1.getProject)
    .put(projects_controller_1.updateProject)
    .delete(projects_controller_1.deleteProject);
exports.default = projectsRouter;
