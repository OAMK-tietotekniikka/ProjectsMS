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
import { useNavigate } from "react-router-dom";
import { studentLogin, teacherLogin } from "./apiRequests/userApiRequests";
const UserContext = React.createContext({});
const UserContextProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [studentId, setStudentId] = useState(0);
    const [teacherId, setTeacherId] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", user);
        }
    }, [user]);
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);
    const login = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
        if (user === 'teacher') {
            try {
                const response = yield teacherLogin(loginData);
                if (!response.data) {
                    alert(`Login failed: ${response.message}`);
                    console.error("Failed to login:", response);
                    return null;
                }
                setToken(response.data.token);
                setTeacherId(response.data.teacherId);
                localStorage.setItem("token", response.data.token);
                return "ok";
            }
            catch (error) {
                console.error("Failed to login:", error);
            }
        }
        if (user === 'student') {
            try {
                const response = yield studentLogin(loginData);
                if (!response.data) {
                    alert(`Login failed: ${response.message}`);
                    console.error("Failed to login:", response);
                    return null;
                }
                setToken(response.token);
                setStudentId(response.data.studentId);
                localStorage.setItem("token", response.data.token);
                return "ok";
            }
            catch (error) {
                console.error("Failed to login:", error);
            }
        }
    });
    const logout = () => {
        setUser("");
        setToken("");
        setStudentId(0);
        setTeacherId(0);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("signedInStudent");
        localStorage.removeItem("signedInTeacher");
        navigate("/");
    };
    let value = {
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        studentId,
        teacherId
    };
    return (_jsx(UserContext.Provider, { value: value, children: props.children }));
};
export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};
export default UserContextProvider;
