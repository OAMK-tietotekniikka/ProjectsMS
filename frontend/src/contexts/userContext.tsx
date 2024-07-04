import React, { useState, useEffect } from "react";

interface UserContextType {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

const UserContextProvider = (props: any) => {
    const [ user, setUser ] = useState("");
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

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

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

export default UserContextProvider;
