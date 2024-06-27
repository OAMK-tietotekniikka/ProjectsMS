"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companies_controller_1 = require("../controllers/companies.controller");
const companiesRouter = (0, express_1.Router)();
companiesRouter.route('/')
    .get(companies_controller_1.getCompanies)
    .post(companies_controller_1.createCompany);
exports.default = companiesRouter;
