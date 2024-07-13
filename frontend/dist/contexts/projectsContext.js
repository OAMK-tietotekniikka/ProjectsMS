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
import { getAllProjects, addProject, getAllStudentProjects, addStudentProject } from "./apiRequests";
;
const ProjectsContext = React.createContext({});
const ProjectsContextProvider = (props) => {
    const [projects, setProjects] = useState([]);
    const [studentProjects, setStudentProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const projectsList = yield getAllProjects();
                setProjects(projectsList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchProjects();
    }, []);
    useEffect(() => {
        const fetchStudentProjects = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const projectsList = yield getAllStudentProjects();
                console.log('Student projects:', projectsList);
                setStudentProjects(projectsList.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchStudentProjects();
    }, []);
    const addNewProject = (formData, studentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield addProject(formData);
            setProjects([...projects, response.data]);
            if (response.statusCode === 201) {
                try {
                    const studentProj = yield addStudentProject(studentId, response.data.project_id);
                    setStudentProjects([...studentProjects, studentProj.data]);
                }
                catch (error) {
                    console.error("Failed to add student_project data:", error);
                }
            }
            return response;
        }
        catch (error) {
            console.error("Failed to add Project:", error);
        }
    });
    let value = {
        projects,
        setProjects,
        studentProjects,
        addNewProject
    };
    return (_jsx(ProjectsContext.Provider, { value: value, children: props.children }));
};
export const useProjectsContext = () => {
    const context = React.useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjectsContext must be used within a ProjectsContextProvider");
    }
    return context;
};
export default ProjectsContextProvider;
