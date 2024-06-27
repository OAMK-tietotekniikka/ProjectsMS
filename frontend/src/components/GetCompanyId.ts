import { Company } from '../interface/company'

export const getCompanyId = async (companyName: string, companies: Company[], addCompany: (name: string) => Promise<number>): Promise<number> => {
    console.log(`From getCompanyId, companies: `, companies)
    console.log(`From getCompanyId, companyName: `, companyName)

    const company = companies.find((company: Company) => company.company_name === companyName)
    const companyId = company ? company.company_id : null
    console.log(`From getCompanyId. companyId: `, companyId)

    if (!companyId) {
        // if company does not exist, create a new company in companies table and get the company_id
        try {
            const company_id = await addCompany(companyName)
            console.log(`From getCompanyId, company_id: `, company_id)
            return company_id
        } catch (error) {
            console.error(`Unable to get companyId: ${error}`)
            return 0;
        }
    } else {
        return companyId
    }
};