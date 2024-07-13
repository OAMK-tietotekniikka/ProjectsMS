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
import { getStudents } from "./apiRequests";
;
const StudentsContext = React.createContext({});
const StudentsContextProvider = (props) => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const studentsList = yield getStudents();
                setStudents(studentsList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchStudents();
    }, []);
    let value = {
        students
    };
    return (_jsx(StudentsContext.Provider, { value: value, children: props.children }));
};
export const useStudentsContext = () => {
    const context = React.useContext(StudentsContext);
    if (!context) {
        throw new Error("usestudentsContext must be used within a StudentsContextProvider");
    }
    return context;
};
export default StudentsContextProvider;
