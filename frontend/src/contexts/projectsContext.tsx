import React, { useState, useEffect } from "react";
import { getAllProjects, addProject, getAllStudentProjects, addStudentProject, updateProject } from "./apiRequests";
import { Project } from "../interface/project";
import { ProjectFormData } from "../interface/formData";
import { StudentProject } from "../interface/studentProject";

interface ProjectsContextType {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    studentProjects: StudentProject[];
    addNewProject: (formData: ProjectFormData, studentId: number) => Promise<any>;
    modifyProject: (project: ProjectFormData, projectId: number) => Promise<Project>;
};

const ProjectsContext = React.createContext<ProjectsContextType>({} as ProjectsContextType);

const ProjectsContextProvider = (props: any) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [studentProjects, setStudentProjects] = useState<StudentProject[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsList = await getAllProjects();
                setProjects(projectsList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchProjects();
    }, []);

    useEffect(() => {
        const fetchStudentProjects = async () => {
            try {
                const projectsList = await getAllStudentProjects();
                setStudentProjects(projectsList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchStudentProjects();
    }, []);


    const addNewProject = async (formData: ProjectFormData, studentId: number): Promise<any> => {
        try {
            const response = await addProject(formData);
            setProjects([...projects, response.data]);
            if (response.statusCode === 201) {
                try {
                    const studentProj = await addStudentProject(studentId, response.data.project_id);
                    setStudentProjects([...studentProjects, studentProj.data]);
                } catch (error) {
                    console.error("Failed to add student_project data:", error);
                }
            }
            return response;
        } catch (error) {
            console.error("Failed to add Project:", error);
        }
    };

    const modifyProject = async (projecct: ProjectFormData, projectId: number): Promise<Project> => {
        try {
            const response = await updateProject(projecct, projectId);
            setProjects((prevProjects) => prevProjects.filter((project) => project.project_id !== projectId).concat(response.data));
            console.log("Modified Project:", projects);
            return response;
        } catch (error) {
            console.error("Failed to add modified Project:", error);
        }
    };


    let value = {
        projects,
        setProjects,
        studentProjects,
        addNewProject,
        modifyProject
    };

    return (
        <ProjectsContext.Provider value={value}>
            {props.children}
        </ProjectsContext.Provider>
    );
};

export const useProjectsContext = () => {
    const context = React.useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjectsContext must be used within a ProjectsContextProvider");
    }
    return context;
};

export default ProjectsContextProvider;


