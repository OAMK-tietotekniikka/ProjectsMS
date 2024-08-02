"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companies_controller_1 = require("../controllers/companies.controller");
const passportMiddleware_1 = require("../passportMiddleware");
const companiesRouter = (0, express_1.Router)();
companiesRouter.route('/')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), companies_controller_1.getCompanies)
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), companies_controller_1.createCompany);
companiesRouter.route('/favo')
    .post(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher'), companies_controller_1.addFavoCompany);
companiesRouter.route('/favo/:teacher_id')
    .get(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher', 'student'), companies_controller_1.getFavoCompanies);
companiesRouter.route('/deleteFavo/:teacher_id')
    .delete(passportMiddleware_1.authenticated, (0, passportMiddleware_1.authorizeRoles)('teacher'), companies_controller_1.deleteFavoCompany);
exports.default = companiesRouter;
