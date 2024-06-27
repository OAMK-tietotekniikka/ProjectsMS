import { Router } from "express";   
import { getCompanies, createCompany } from "../controllers/companies.controller";


const companiesRouter = Router();

companiesRouter.route('/')
  .get(getCompanies)
  .post(createCompany);

export default companiesRouter;