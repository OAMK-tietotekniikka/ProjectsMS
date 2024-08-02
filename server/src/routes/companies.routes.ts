import { Router } from "express";   
import { getCompanies, createCompany, getFavoCompanies, addFavoCompany, deleteFavoCompany } from "../controllers/companies.controller";
import { authenticated, authorizeRoles } from '../passportMiddleware';


const companiesRouter = Router();

companiesRouter.route('/')
  .get(authenticated, authorizeRoles('teacher', 'student'), getCompanies)
  .post(authenticated, authorizeRoles('teacher', 'student'), createCompany);

companiesRouter.route('/favo')
  .post(authenticated, authorizeRoles('teacher'), addFavoCompany)

companiesRouter.route('/favo/:teacher_id')
  .get(authenticated, authorizeRoles('teacher', 'student'), getFavoCompanies);

companiesRouter.route('/deleteFavo/:teacher_id')
  .delete(authenticated, authorizeRoles('teacher'), deleteFavoCompany)

export default companiesRouter;