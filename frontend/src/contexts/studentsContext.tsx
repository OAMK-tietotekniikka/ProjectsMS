import React, { useState, useEffect } from "react";
import { getStudents } from "./apiRequests";
import { Student } from "../interface/student";


interface StudentsContextType {
    students: Student[];
};

const StudentsContext = React.createContext<StudentsContextType>({} as StudentsContextType);

const StudentsContextProvider = (props: any) => {
    const [students, setStudents] = useState<Student[]>([]);

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

    let value = { 
        students
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


