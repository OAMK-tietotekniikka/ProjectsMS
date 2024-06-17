import React, { useState, useEffect } from "react";
import axios from "axios";
import { Teacher } from "../interface/teacher";
import { Resource } from "../interface/resource";

interface TeachersContextType {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

const TeachersContext = React.createContext<TeachersContextType>({} as TeachersContextType);

const TeachersContextProvider = (props: any) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("http://localhost:8081/teachers");
                setTeachers(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get("http://localhost:8081/resources");
                setResources(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchResources();
        
    }, []);

    let value = { 
        teachers,
        setTeachers,
        resources,
        setResources
    };

    return  (
        <TeachersContext.Provider value={value}>
            {props.children}
        </TeachersContext.Provider>
    )
};

export const useTeachersContext = () => {
    const context = React.useContext(TeachersContext);
    if (!context) {
        throw new Error("useTeachersContext must be used within a TeachersContextProvider");
    }
    return context;
}


export default TeachersContextProvider;