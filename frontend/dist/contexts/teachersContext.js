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
import { getTeachers, getResources, updateResource, createResource } from "./apiRequests/teachersApiRequests";
import { useUserContext } from "./userContext";
const TeachersContext = React.createContext({});
const TeachersContextProvider = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [resources, setResources] = useState([]);
    const [signedInTeacher, setSignedInTeacherState] = useState(() => {
        const savedTeacher = localStorage.getItem('signedInTeacher');
        return savedTeacher ? JSON.parse(savedTeacher) : null;
    });
    const { teacherId } = useUserContext();
    useEffect(() => {
        const fetchTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const teachersList = yield getTeachers();
                setTeachers(teachersList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchTeachers();
    }, []);
    useEffect(() => {
        const fetchResources = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const reourceList = yield getResources();
                setResources(reourceList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchResources();
    }, []);
    useEffect(() => {
        if (teachers.length === 0 || teacherId === 0)
            return;
        const teacher = teachers.find(t => t.teacher_id === teacherId);
        if (teacher) {
            setSignedInTeacher(teacher);
        }
    }, [teachers, teacherId]);
    const setSignedInTeacher = (teacher) => {
        setSignedInTeacherState(teacher);
        if (teacher) {
            localStorage.setItem('signedInTeacher', JSON.stringify(teacher));
        }
        else {
            localStorage.removeItem('signedInTeacher');
        }
    };
    const updateTeacherResource = (id, resource) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield updateResource(id, resource);
            setResources(prevResources => prevResources.map(r => r.resource_id === id ? response.data : r));
            return response.data;
        }
        catch (error) {
            console.error("Failed to update resource:", error);
        }
    });
    const addTeacherResource = (resource) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield createResource(resource);
            setResources(prevResources => [...prevResources, response.data]);
            return response.data;
        }
        catch (error) {
            console.error("Failed to add resource:", error);
        }
    });
    let value = {
        teachers,
        setTeachers,
        signedInTeacher,
        resources,
        setResources,
        updateTeacherResource,
        addTeacherResource
    };
    return (_jsx(TeachersContext.Provider, { value: value, children: props.children }));
};
export const useTeachersContext = () => {
    const context = React.useContext(TeachersContext);
    if (!context) {
        throw new Error("useTeachersContext must be used within a TeachersContextProvider");
    }
    return context;
};
export default TeachersContextProvider;
