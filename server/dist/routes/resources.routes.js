"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resources_controller_1 = require("../controllers/resources.controller");
const passportMiddleware_1 = require("../passportMiddleware");
const resourcesRouter = (0, express_1.Router)();
resourcesRouter.route('/')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), resources_controller_1.getResources)
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher'), resources_controller_1.createResource);
resourcesRouter.route('/:resource_id')
    .put(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), resources_controller_1.updateResource);
exports.default = resourcesRouter;
