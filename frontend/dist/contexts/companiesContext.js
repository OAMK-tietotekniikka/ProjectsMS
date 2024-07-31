var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { getCompanies, addNewCompany, getFavoCompanies, addNewFavoCompany, deleteFavoCompanies } from "./apiRequests/companiesApiRequests";
;
const CompaniesContext = React.createContext({});
const CompaniesContextProvider = (props) => {
    const [companies, setCompanies] = useState([]);
    const [teacherFavoCompanies, setTeacherFavoCompanies] = useState([]);
    useEffect(() => {
        const fetchCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const companiesList = yield getCompanies();
                setCompanies(companiesList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchCompanies();
    }, []);
    useEffect(() => {
        const fetchFavoCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // id is hardcoded now; when sign in works, use the signed in teacher id
                //const id = Number(localStorage.getItem("teacher_id"));
                const companies = yield getFavoCompanies(1);
                setTeacherFavoCompanies(companies.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchFavoCompanies();
    }, []);
    const addCompany = (companyName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`From addCompany, companyName:`, companyName);
        try {
            const response = yield addNewCompany(companyName);
            console.log(`From addCompany, response:`, response);
            setCompanies([...companies, response]);
            return response.company_id;
        }
        catch (error) {
            console.error("Failed to add company:", error);
        }
    });
    const addFavoCompany = (companiesList, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
        //first delete all the companies from the teacher's favourite list
        try {
            const response = yield deleteFavoCompanies(teacherId);
            if (response.statusCode === 200) {
                console.log('All companies deleted successfully:', response);
                //then add the new companies to the teacher's favourite list
                const addPromises = companiesList.map((company) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const response = yield addNewFavoCompany({ company_id: company.company_id, teacher_id: teacherId });
                        return response;
                    }
                    catch (error) {
                        console.error("Failed to add company:", error);
                        throw error;
                    }
                }));
                //wait for all add operations to complete
                yield Promise.all(addPromises);
                console.log('New companies added successfully');
            }
        }
        catch (error) {
            console.error("Failed to delete companies:", error);
        }
    });
    let value = {
        companies,
        setCompanies,
        teacherFavoCompanies,
        setTeacherFavoCompanies,
        addCompany,
        addFavoCompany
    };
    return (_jsx(CompaniesContext.Provider, { value: value, children: props.children }));
};
export const useCompaniesContext = () => {
    const context = React.useContext(CompaniesContext);
    if (!context) {
        throw new Error("useCompaniesContext must be used within a CompaniesContextProvider");
    }
    return context;
};
export default CompaniesContextProvider;
