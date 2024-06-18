"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../controllers/projects.controller");
const projectsRouters = (0, express_1.Router)();
projectsRouters.route('/')
    .get(projects_controller_1.getProjects)
    .post(projects_controller_1.createProject);
projectsRouters.route('/:project_id')
    .get(projects_controller_1.getProject)
    .put(projects_controller_1.updateProject)
    .delete(projects_controller_1.deleteProject);
exports.default = projectsRouters;
