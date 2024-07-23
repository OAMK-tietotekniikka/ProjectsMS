import React, { useState, useEffect } from "react";
import { getStudents } from "./apiRequests";
import { Student } from "../interface/student";


interface StudentsContextType {
    students: Student[];
    signedInStudent: Student;
    setSignedInStudent: (student: Student | null) => void;
};

const StudentsContext = React.createContext<StudentsContextType>({} as StudentsContextType);

const StudentsContextProvider = (props: any) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [signedInStudent, setSignedInStudentState] = useState<Student | null>(() => {
        const savedStudent = localStorage.getItem('signedInStudent');
        return savedStudent ? JSON.parse(savedStudent) : null;
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsList = await getStudents();
                setStudents(studentsList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchStudents();
    }, []);


    useEffect(() => {
        if (!students) return;
        const student = students.find(s => s.student_id === 1); // hardcoded for now
        if (student) {
            setSignedInStudent(student);
        } 
    }, [students]);

    const setSignedInStudent = (student: Student | null) => {
        setSignedInStudentState(student);
        if (student) {
            localStorage.setItem('signedInStudent', JSON.stringify(student));
        } else {
            localStorage.removeItem('signedInStudent');
        }
    };

    let value = { 
        students,
        signedInStudent,
        setSignedInStudent
    };

    return (
        <StudentsContext.Provider value={value}>
            {props.children}
        </StudentsContext.Provider>
    );
};

export const useStudentsContext = () => {
    const context = React.useContext(StudentsContext);
    if (!context) {
        throw new Error("usestudentsContext must be used within a StudentsContextProvider");
    }
    return context;
};

export default StudentsContextProvider;


