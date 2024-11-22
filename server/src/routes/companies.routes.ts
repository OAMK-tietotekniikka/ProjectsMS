import { Router } from "express";   
import { getCompanies, createCompany, getFavoCompanies, addFavoCompany, deleteFavoCompany } from "../controllers/companies.controller";


const companiesRouter = Router();

companiesRouter.route('/')
  .get(getCompanies)
  .post(createCompany);

companiesRouter.route('/favo')
  .post(addFavoCompany)

companiesRouter.route('/favo/:teacher_id')
  .get(getFavoCompanies)
  .delete(deleteFavoCompany)

export default companiesRouter;