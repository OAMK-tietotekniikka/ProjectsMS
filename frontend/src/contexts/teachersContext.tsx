import React, { useState, useEffect } from "react";
import { getTeachers, getResources, updateResource, createResource } from "./apiRequests/teachersApiRequests";
import { Teacher } from "../interface/teacher";
import { Resource, NewResource } from "../interface/resource";
import { useUserContext } from "./userContext";


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
    const { teacherId, token } = useUserContext();

    let authHeader: any = {};
    if (token) {
        authHeader = { headers: { Authorization: `Bearer ${token}` } };
    }

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teachersList = await getTeachers(authHeader);
                setTeachers(teachersList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        if (token) {
            fetchTeachers();
        } else {
            setTeachers([]);
        }
    }, [token]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const reourceList = await getResources(authHeader);
                setResources(reourceList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        if (token) {
            fetchResources();
        } else {
            setResources([]);
        }
    }, [token]);

    useEffect(() => {
        if (teachers?.length === 0 || teacherId === 0) return;
        const teacher = teachers?.find(t => t.teacher_id === teacherId);
        if (teacher) {
            setSignedInTeacher(teacher);
        }
    }, [teachers, teacherId, token]);

    const setSignedInTeacher = (teacher: Teacher | null) => {
        setSignedInTeacherState(teacher);
        if (teacher) {
            localStorage.setItem('signedInTeacher', JSON.stringify(teacher));
        } else {
            localStorage.removeItem('signedInTeacher');
        }
    };

    const updateTeacherResource = async (id: number, resource: NewResource) => {
        try {
            const response = await updateResource(id, resource, authHeader);
            console.log(response.data);
            const updatedResource = {...response.data, resource_id: id, created_at: new Date()};
            setResources(prevResources => prevResources.filter(r => r.resource_id !== id).concat(updatedResource));
            return response.data;
        } catch (error) {
            console.error("Failed to update resource:", error);
        }
    };

    const addTeacherResource = async (resource: NewResource) => {
        try {
            const response = await createResource(resource, authHeader);
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


