import React, { useState, useEffect } from "react";
import { getTeachers, getResources, updateResource, getFavoCompanies } from "./apiRequests";
import { Teacher } from "../interface/teacher";
import { Resource } from "../interface/resource";
import { use } from "i18next";


interface TeachersContextType {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    signedInTeacher: Teacher;
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    updateTeacherResource: (id: number, resource: Resource) => Promise<Resource>;
}

const TeachersContext = React.createContext<TeachersContextType>({} as TeachersContextType);

const TeachersContextProvider = (props: any) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [signedInTeacher, setSignedInTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersList = await getTeachers();
                setTeachers(teachersList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchTeachers();

    }, []);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const reourceList = await getResources();
                setResources(reourceList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchResources();

    }, []);

    useEffect(() => {
        if (!teachers) return;
        const teacher = teachers.find(t => t.teacher_id === 1); // hardcoded for now
        if (teacher) {
            setSignedInTeacher(teacher);
        }
    }, [teachers]);

    const updateTeacherResource = async (id: number, resource: Resource) => {
        try {
            const response = await updateResource(id, resource);
            console.log(`From updateTeacherResource, response:`, response);
            setResources(prevResources => prevResources.map(r => r.resource_id === id ? response.data : r));
            return response.data;
        } catch (error) {
            console.error("Failed to update resource:", error);
        }
    };

    let value = {
        teachers,
        setTeachers,
        signedInTeacher,
        resources,
        setResources,
        updateTeacherResource
    };

    return (
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