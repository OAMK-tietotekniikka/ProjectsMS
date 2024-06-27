var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getCompanyId = (companyName, companies, addCompany) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`From getCompanyId, companies: `, companies);
    console.log(`From getCompanyId, companyName: `, companyName);
    const company = companies.find((company) => company.company_name === companyName);
    const companyId = company ? company.company_id : null;
    console.log(`From getCompanyId. companyId: `, companyId);
    if (!companyId) {
        // if company does not exist, create a new company in companies table and get the company_id
        try {
            const company_id = yield addCompany(companyName);
            console.log(`From getCompanyId, company_id: `, company_id);
            return company_id;
        }
        catch (error) {
            console.error(`Unable to get companyId: ${error}`);
            return 0;
        }
    }
    else {
        return companyId;
    }
});
