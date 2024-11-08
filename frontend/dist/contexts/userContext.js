import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
const UserContext = React.createContext({});
const UserContextProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [studentId, setStudentId] = useState(parseInt(localStorage.getItem("studentId") || "0"));
    const [teacherId, setTeacherId] = useState(parseInt(localStorage.getItem("teacherId") || "0"));
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
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    };
    let value = {
        user,
        setUser,
        token,
        setToken,
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
