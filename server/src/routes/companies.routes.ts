import { Router } from "express";   
import { getCompanies, createCompany, getFavoCompanies, addFavoCompany, deleteFavoCompany } from "../controllers/companies.controller";


const companiesRouter = Router();

companiesRouter.route('/')
  .get(getCompanies)
  .post(createCompany);

companiesRouter.route('/favo')
  .post(addFavoCompany)

companiesRouter.route('/favo/:teacher_id')
  .get(getFavoCompanies);

companiesRouter.route('/deleteFavo/:teacher_id')
  .delete(deleteFavoCompany)

export default companiesRouter;