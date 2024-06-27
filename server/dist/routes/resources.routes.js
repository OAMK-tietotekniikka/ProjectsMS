"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resources_controller_1 = require("../controllers/resources.controller");
const resourcesRouter = (0, express_1.Router)();
resourcesRouter.route('/')
    .get(resources_controller_1.getResources)
    .post(resources_controller_1.createResource);
resourcesRouter.route('/:project_id');
exports.default = resourcesRouter;
