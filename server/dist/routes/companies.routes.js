"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companies_controller_1 = require("../controllers/companies.controller");
const companiesRouter = (0, express_1.Router)();
companiesRouter.route('/')
    .get(companies_controller_1.getCompanies)
    .post(companies_controller_1.createCompany);
companiesRouter.route('/favo')
    .post(companies_controller_1.addFavoCompany);
companiesRouter.route('/favo/:teacher_id')
    .get(companies_controller_1.getFavoCompanies);
companiesRouter.route('/deleteFavo/:teacher_id')
    .delete(companies_controller_1.deleteFavoCompany);
exports.default = companiesRouter;
