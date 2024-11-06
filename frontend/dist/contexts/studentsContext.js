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
import { getStudents, updateStudent, getStudent, createStudent } from "./apiRequests/studentsApiRequests";
import { useUserContext } from "./userContext";
;
const StudentsContext = React.createContext({});
const StudentsContextProvider = (props) => {
    const [students, setStudents] = useState([]);
    const [signedInStudent, setSignedInStudentState] = useState(() => {
        const savedStudent = localStorage.getItem('signedInStudent');
        return savedStudent ? JSON.parse(savedStudent) : null;
    });
    const { studentId, token } = useUserContext();
    let authHeader = {};
    if (token) {
        authHeader = { headers: { Authorization: `Bearer ${token}` } };
    }
    useEffect(() => {
        const fetchStudents = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const studentsList = yield getStudents(authHeader);
                setStudents(studentsList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        if (token) {
            fetchStudents();
        }
        else {
            setStudents([]);
        }
    }, [token, setStudents, signedInStudent]);
    useEffect(() => {
        if ((students === null || students === void 0 ? void 0 : students.length) === 0 || studentId === 0)
            return;
        const student = students === null || students === void 0 ? void 0 : students.find(s => s.student_id === studentId);
        if (student) {
            setSignedInStudent(student);
        }
    }, [students, studentId, token]);
    const setSignedInStudent = (student) => {
        setSignedInStudentState(student);
        if (student) {
            localStorage.setItem('signedInStudent', JSON.stringify(student));
        }
        else {
            localStorage.removeItem('signedInStudent');
        }
    };
    const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield getStudent(email, authHeader);
            if (response.statusCode === 200) {
                setSignedInStudent(response.data[0]);
                localStorage.setItem('signedInStudent', JSON.stringify(response.data[0]));
                localStorage.setItem('studentId', JSON.stringify(response.data[0].student_id));
                return response.data[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Failed to get student by email:", error);
        }
    });
    const addNewStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield createStudent(student, authHeader);
            setStudents(prevStudents => [...prevStudents, response.data]);
            setSignedInStudent(response.data);
            localStorage.setItem('signedInStudent', JSON.stringify(response.data));
            localStorage.setItem('studentId', JSON.stringify(response.data.student_id));
            return response.data;
        }
        catch (error) {
            console.error("Failed to add new student:", error);
        }
    });
    const modifyStudent = (student, studentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield updateStudent(student, studentId, authHeader);
            if (response.statusCode === 200) {
                setStudents((prevStudents) => prevStudents.filter(s => s.student_id !== studentId).concat(response.data));
            }
        }
        catch (error) {
            console.error("Failed to update student:", error);
        }
    });
    let value = {
        students,
        signedInStudent,
        setSignedInStudent,
        modifyStudent,
        getStudentByEmail,
        addNewStudent
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
