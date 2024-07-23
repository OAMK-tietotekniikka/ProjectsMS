import React, { useState, useEffect } from "react";
import { getTeachers, getResources, updateResource, getFavoCompanies, createResource } from "./apiRequests";
import { Teacher } from "../interface/teacher";
import { Resource, NewResource } from "../interface/resource";


interface TeachersContextType {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    signedInTeacher: Teacher;
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    updateTeacherResource: (id: number, resource: NewResource) => Promise<Resource>;
    addTeacherResource: (resource: NewResource) => Promise<Resource>;

}

const TeachersContext = React.createContext<TeachersContextType>({} as TeachersContextType);

const TeachersContextProvider = (props: any) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [signedInTeacher, setSignedInTeacherState] = useState<Teacher | null>(() => {
        const savedTeacher = localStorage.getItem('signedInTeacher');
        return savedTeacher ? JSON.parse(savedTeacher) : null;
    });

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

    const setSignedInTeacher = (teacher: Teacher | null) => {
        setSignedInTeacherState(teacher);
        if (teacher) {
            localStorage.setItem('signedInTeacher', JSON.stringify(teacher));
        } else {
            localStorage.removeItem('signedInTeacher');
        }
    };

    const updateTeacherResource = async (id: number, resource: Resource) => {
        try {
            const response = await updateResource(id, resource);
            setResources(prevResources => prevResources.map(r => r.resource_id === id ? response.data : r));
            return response.data;
        } catch (error) {
            console.error("Failed to update resource:", error);
        }
    };

    const addTeacherResource = async (resource: NewResource) => {
        try {
            const response = await createResource(resource);
            setResources(prevResources => [...prevResources, response.data]);
            return response.data;
        } catch (error) {
            console.error("Failed to add resource:", error);
        }
    };

    let value = {
        teachers,
        setTeachers,
        signedInTeacher,
        resources,
        setResources,
        updateTeacherResource,
        addTeacherResource
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