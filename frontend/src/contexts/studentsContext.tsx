import React, { useState, useEffect } from "react";
import { getStudents, updateStudent, getStudent, createStudent } from "./apiRequests/studentsApiRequests";
import { Student, UpdatedStudent, newStudent } from "../interface/student";
import { useUserContext } from "./userContext";


interface StudentsContextType {
    students: Student[];
    signedInStudent: Student;
    setSignedInStudent: (student: Student | null) => void;
    modifyStudent: (student: UpdatedStudent, studentId: number) => void;
    getStudentByEmail: (email: string) => Promise<Student>;
    addNewStudent: (student: newStudent) => Promise<Student>;
};

const StudentsContext = React.createContext<StudentsContextType>({} as StudentsContextType);

const StudentsContextProvider = (props: any) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [signedInStudent, setSignedInStudentState] = useState<Student | null>(() => {
        const savedStudent = localStorage.getItem('signedInStudent');
        return savedStudent ? JSON.parse(savedStudent) : null;
    });
    const { studentId, token } = useUserContext();

    let authHeader: any = {};
    if (token) {
        authHeader = { headers: { Authorization: `Bearer ${token}` } };
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsList = await getStudents(authHeader);
                setStudents(studentsList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        if (token) {
            fetchStudents();
        } else {
            setStudents([]);
        }
    }, [token, setStudents, signedInStudent]);


    useEffect(() => {
        if (students?.length === 0 || studentId === 0) return;
        const student = students?.find(s => s.student_id === studentId);
        if (student) {
            setSignedInStudent(student);
        }
    }, [students, studentId, token]);

    const setSignedInStudent = (student: Student | null) => {
        setSignedInStudentState(student);
        if (student) {
            localStorage.setItem('signedInStudent', JSON.stringify(student));
        } else {
            localStorage.removeItem('signedInStudent');
        }
    };

    const getStudentByEmail = async (email: string) => {
        try {
            const response = await getStudent(email, authHeader);
            if (response.statusCode === 200) {
                setSignedInStudent(response.data[0]);
                localStorage.setItem('signedInStudent', JSON.stringify(response.data[0]));
                localStorage.setItem('studentId', JSON.stringify(response.data[0].student_id));
                return response.data[0];
            } else {
                return null;
            }
        }
        catch (error) {
            console.error("Failed to get student by email:", error);
        }
    };

    const addNewStudent = async (student: newStudent) => {
        try {
            const response = await createStudent(student, authHeader);
            setStudents(prevStudents => [...prevStudents, response.data]);
            setSignedInStudent(response.data);
            localStorage.setItem('signedInStudent', JSON.stringify(response.data));
            localStorage.setItem('studentId', JSON.stringify(response.data.student_id));
            return response.data;
        }
        catch (error) {
            console.error("Failed to add new student:", error);
        }
    };

    const modifyStudent = async (student: UpdatedStudent, studentId: number) => {
        try {
            const response = await updateStudent(student, studentId, authHeader);
            if (response.statusCode === 200) {
                setStudents((prevStudents) => prevStudents.filter(s => s.student_id !== studentId).concat(response.data));
            }
        }
        catch (error) {
            console.error("Failed to update student:", error
            );
        }
    };

    let value = {
        students,
        signedInStudent,
        setSignedInStudent,
        modifyStudent,
        getStudentByEmail,
        addNewStudent
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


