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
import { useMsal } from "@azure/msal-react";
const UserContext = React.createContext({});
const UserContextProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [studentId, setStudentId] = useState(parseInt(localStorage.getItem("studentId") || "0"));
    const [teacherId, setTeacherId] = useState(parseInt(localStorage.getItem("teacherId") || "0"));
    const navigate = useNavigate();
    const { instance } = useMsal();
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", user);
        }
    }, [user]);
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token, setToken]);
    useEffect(() => {
        if (studentId) {
            localStorage.setItem("studentId", studentId.toString());
        }
    }, [studentId]);
    useEffect(() => {
        if (teacherId) {
            localStorage.setItem("teacherId", teacherId.toString());
        }
    }, [teacherId]);
    // Remove the following login code when the Entra ID login function is implemented
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
                setToken(response.data.token);
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
        localStorage.removeItem("studentId");
        localStorage.removeItem("teacherId");
        localStorage.removeItem("signedInStudent");
        localStorage.removeItem("signedInTeacher");
        localStorage.removeItem("teacherCurrentResource");
        localStorage.removeItem("teacherUsedResource");
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
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
