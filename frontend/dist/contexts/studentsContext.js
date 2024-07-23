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
    const [signedInStudent, setSignedInStudentState] = useState(() => {
        const savedStudent = localStorage.getItem('signedInStudent');
        return savedStudent ? JSON.parse(savedStudent) : null;
    });
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
    useEffect(() => {
        if (!students)
            return;
        const student = students.find(s => s.student_id === 1); // hardcoded for now
        if (student) {
            setSignedInStudent(student);
        }
    }, [students]);
    const setSignedInStudent = (student) => {
        setSignedInStudentState(student);
        if (student) {
            localStorage.setItem('signedInStudent', JSON.stringify(student));
        }
        else {
            localStorage.removeItem('signedInStudent');
        }
    };
    let value = {
        students,
        signedInStudent,
        setSignedInStudent
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
