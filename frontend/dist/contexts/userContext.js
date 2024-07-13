import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
const UserContext = React.createContext({});
const UserContextProvider = (props) => {
    const [user, setUser] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const savedUser = localStorage.getItem("user");
    useEffect(() => {
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);
    let value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated
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
