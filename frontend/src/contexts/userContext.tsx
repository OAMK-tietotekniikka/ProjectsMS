// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserLogin } from "../interface/userLogin";
// import { studentLogin, teacherLogin } from "./apiRequests/userApiRequests";

// interface UserContextType {
//     user: string;
//     setUser: React.Dispatch<React.SetStateAction<string>>;
//     token: string;
//     setToken: React.Dispatch<React.SetStateAction<string>>;
//     login: (loginData: UserLogin) => Promise<string | null>;
//     logout: () => void;
//     studentId: number;
//     teacherId: number;
// }

// const UserContext = React.createContext<UserContextType>({} as UserContextType);

// const UserContextProvider = (props: any) => {
//     const [user, setUser] = useState(localStorage.getItem("user") || "");
//     const [token, setToken] = useState(localStorage.getItem("token") || "");
//     const [studentId, setStudentId] = useState(parseInt(localStorage.getItem("stidentId") || "0"));
//     const [teacherId, setTeacherId] = useState(parseInt(localStorage.getItem("teacherId") || "0"));
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             localStorage.setItem("user", user);
//         } 
//     }, [user]);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem("token", token);
//         } 
//     }, [token]);

//     useEffect(() => {
//         if (studentId) {
//             localStorage.setItem("studentId", studentId.toString());
//         } 
//     }, [studentId]);

//     useEffect(() => {
//         if (teacherId) {
//             localStorage.setItem("teacherId", teacherId.toString());
//         } 
//     }, [teacherId]);

//     const login = async (loginData: UserLogin): Promise<string | null> => {
//         if (user === 'teacher') {
//             try {
//                 const response = await teacherLogin(loginData);
//                 if (!response.data) {
//                     alert(`Login failed: ${response.message}`);
//                     console.error("Failed to login:", response);
//                     return null;
//                 }
//                 setToken(response.data.token);
//                 setTeacherId(response.data.teacherId);
//                 localStorage.setItem("token", response.data.token);
//                 return "ok"
//             } catch (error) {
//                 console.error("Failed to login:", error);
//             }
//         }
//         if (user === 'student') {
//             try {
//                 const response = await studentLogin(loginData);
//                 if (!response.data) {
//                     alert(`Login failed: ${response.message}`);
//                     console.error("Failed to login:", response);
//                     return null;
//                 }
//                 setToken(response.data.token);
//                 setStudentId(response.data.studentId);
//                 localStorage.setItem("token", response.data.token);
//                 return "ok"
//             } catch (error) {
//                 console.error("Failed to login:", error);
//             }
//         }
//     };

//     const logout = () => {
//         setUser("");
//         setToken("");
//         setStudentId(0);
//         setTeacherId(0)
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         localStorage.removeItem("studentId");
//         localStorage.removeItem("teacherId");
//         localStorage.removeItem("signedInStudent");
//         localStorage.removeItem("signedInTeacher");
//         navigate("/");
//     };

//     let value = {
//         user,
//         setUser,
//         token,
//         setToken,
//         login,
//         logout,
//         studentId,
//         teacherId
//     };

//     return (
//         <UserContext.Provider value={value}>
//             {props.children}
//         </UserContext.Provider>
//     );
// }

// export const useUserContext = () => {
//     const context = React.useContext(UserContext);
//     if (!context) {
//         throw new Error("useUserContext must be used within a UserContextProvider");
//     }
//     return context;
// };

// export default UserContextProvider;


import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserLogin } from '../interface/userLogin';
import { studentLogin, teacherLogin } from './apiRequests/userApiRequests';

interface UserContextType {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    login: (loginData: UserLogin) => Promise<string | null>;
    logout: () => void;
    studentId: number | null;
    teacherId: number | null;
    setStudentId: React.Dispatch<React.SetStateAction<number | null>>;
    setTeacherId: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [studentId, setStudentId] = useState<number | null>(null);
    const [teacherId, setTeacherId] = useState<number | null>(null);

    const login = async (loginData: UserLogin): Promise<string | null> => {
        let response;
        if (loginData.email.includes('@student')) {
            response = await studentLogin(loginData);
            if (response && response.message === "Student authenticated") {
                setUser('student');
                setToken(response.token);
                setStudentId(response.studentId);
                return 'student';
            }
        } else {
            response = await teacherLogin(loginData);
            if (response && response.message === "Teacher authenticated") {
                setUser('teacher');
                setToken(response.token);
                setTeacherId(response.teacherId);
                return 'teacher';
            }
        }
        return null;
    };

    const logout = () => {
        setUser('');
        setToken('');
        setStudentId(null);
        setTeacherId(null);
    };

    useEffect(() => {
        // Optionally, you can add logic to check for existing tokens in local storage and set the user state accordingly
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, login, logout, studentId, teacherId, setStudentId, setTeacherId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export default UserProvider;