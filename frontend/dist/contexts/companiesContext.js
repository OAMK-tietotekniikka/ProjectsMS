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
import { getCompanies, addNewCompany } from "./apiRequests";
const CompaniesContext = React.createContext({});
const CompaniesContextProvider = (props) => {
    const [companies, setCompanies] = useState([]);
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
    const addCompany = (companyName) => __awaiter(void 0, void 0, void 0, function* () {
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
    let value = {
        companies,
        setCompanies,
        addCompany,
    };
    return (_jsx(CompaniesContext.Provider, Object.assign({ value: value }, { children: props.children })));
};
export const useCompaniesContext = () => {
    const context = React.useContext(CompaniesContext);
    if (!context) {
        throw new Error("useCompaniesContext must be used within a CompaniesContextProvider");
    }
    return context;
};
export default CompaniesContextProvider;
