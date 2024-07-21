import { Company } from '../../interface/company'

export const getCompanyId = async (companyName: string, companies: Company[], addCompany: (name: string) => Promise<number>): Promise<number> => {
    const lowerCaseCompanyName = companyName.toLowerCase();

    const company = companies.find((company: Company) => company.company_name.toLowerCase() === lowerCaseCompanyName);
    const companyId = company ? company.company_id : null

    if (!companyId) {
        // if company does not exist, create a new company in companies table and get the company_id
        try {
            const company_id = await addCompany(companyName)
            return company_id
        } catch (error) {
            console.error(`Unable to get companyId: ${error}`)
            return 0;
        }
    } else {
        return companyId
    }
};