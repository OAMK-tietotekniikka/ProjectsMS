import React, { useState, useEffect } from "react";
import { getCompanies, addNewCompany } from "./apiRequests";
import { Company } from "../interface/company";


interface CompaniesContextType {
    companies: Company[];
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
    addCompany: (company_name: string) => Promise<number>;
}

const CompaniesContext = React.createContext<CompaniesContextType>({} as CompaniesContextType);

const CompaniesContextProvider = (props: any) => {
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companiesList = await getCompanies();
                setCompanies(companiesList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchCompanies();
        
    }, []);
    
    const addCompany = async (companyName: string): Promise<number> => {
        try {
            const response = await addNewCompany(companyName);
            console.log(`From addCompany, response:`, response);
            setCompanies([...companies, response]);
            return response.company_id;
        } catch (error) {
            console.error("Failed to add company:", error);
        }
    };

    let value = { 
        companies,
        setCompanies,
        addCompany,
    };

    return (
        <CompaniesContext.Provider value={value}>
            {props.children}
        </CompaniesContext.Provider>
    );
};

export const useCompaniesContext = () => {
    const context = React.useContext(CompaniesContext);
    if (!context) {
        throw new Error("useCompaniesContext must be used within a CompaniesContextProvider");
    }
    return context;
};

export default CompaniesContextProvider;


