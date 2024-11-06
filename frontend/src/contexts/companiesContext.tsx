import React, { useState, useEffect } from "react";
import { getCompanies, addNewCompany, getFavoCompanies, addNewFavoCompany, deleteFavoCompanies } from "./apiRequests/companiesApiRequests";
import { Company } from "../interface/company";
import { useUserContext } from "./userContext";

interface CompaniesContextType {
    companies: Company[];
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
    teacherFavoCompanies: Company[];
    setTeacherFavoCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
    addCompany: (company_name: string) => Promise<any>;
    addFavoCompany: (companyiesList: Company[], teacher_id: number) => Promise<any>;
};

const CompaniesContext = React.createContext<CompaniesContextType>({} as CompaniesContextType);

const CompaniesContextProvider = (props: any) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [teacherFavoCompanies, setTeacherFavoCompanies] = useState<Company[]>([]);
    const { token, teacherId } = useUserContext();

    let authHeader: any = {};
    if (token) {
        authHeader = { headers: { Authorization: `Bearer ${token}` } };
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companiesList = await getCompanies(authHeader);
                setCompanies(companiesList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchCompanies();
        
    }, [token]);

    useEffect(() => {
        const fetchFavoCompanies = async () => {
            try {
                const id = Number(localStorage.getItem('teacherId'));
                const companies = await getFavoCompanies(id, authHeader);
                setTeacherFavoCompanies(companies.data);
            } catch (error) {
                console.error("Failed to fetch data:", error)
            }
        };
        fetchFavoCompanies();

    }, [token, teacherId]);
    
    const addCompany = async (companyName: string): Promise<number> => {
        try {
            const response = await addNewCompany(companyName, authHeader);
            setCompanies([...companies, response]);
            return response.company_id;
        } catch (error) {
            console.error("Failed to add company:", error);
        }
    };

    const addFavoCompany = async (companiesList: Company[], teacherId: number) => {
        //first delete all the companies from the teacher's favourite list
        try {
            const response = await deleteFavoCompanies(teacherId, authHeader);
            if (response.statusCode === 200) {

                //then add the new companies to the teacher's favourite list
                const addPromises = companiesList.map(async (company) => {
                    try {
                        const response = await addNewFavoCompany({ company_id: company.company_id, teacher_id: teacherId }, authHeader);
                        return response;
                    } catch (error) {
                        console.error("Failed to add company:", error);
                        throw error;
                    }
                });
    
                //wait for all add operations to complete
                await Promise.all(addPromises);
            }
        } catch (error) {
            console.error("Failed to delete companies:", error);
        }
    };

    let value = { 
        companies,
        setCompanies,
        teacherFavoCompanies,
        setTeacherFavoCompanies,
        addCompany,
        addFavoCompany
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


