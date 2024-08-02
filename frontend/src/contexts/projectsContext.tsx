import React, { useState, useEffect, useCallback } from "react";
import {
    getAllProjects,
    addProject,
    getAllStudentProjects,
    addStudentProject,
    updateProject,
    getNotes,
    createNote
} from "./apiRequests/projectsApiRequests";
import { Project } from "../interface/project";
import { ProjectFormData } from "../interface/formData";
import { StudentProject } from "../interface/studentProject";
import { NewNote, Note } from "../interface/newNote";
import { useUserContext } from "./userContext";


interface ProjectsContextType {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    studentProjects: StudentProject[];
    addNewProject: (formData: ProjectFormData, studentId: number) => Promise<any>;
    modifyProject: (project: ProjectFormData, projectId: number) => Promise<Project>;
    projectNotes: Note[];
    getProjectNotes: (projectId: number) => Promise<Note[]>;
    addProjectNote: (projectId: number, note: NewNote) => Promise<Note>;
    fetchProjects: () => Promise<void>;
};

const ProjectsContext = React.createContext<ProjectsContextType>({} as ProjectsContextType);

const ProjectsContextProvider = (props: any) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [studentProjects, setStudentProjects] = useState<StudentProject[]>([]);
    const [projectNotes, setProjectNotes] = useState<Note[]>([]);
    const { token } = useUserContext();

    let authHeader: any = {};
    if (token) {
        authHeader = { headers: { Authorization: `Bearer ${token}` } };
    }

    const fetchProjects = useCallback(async () => {
        try {
            const projectsList = await getAllProjects(authHeader);
            setProjects(projectsList.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
        fetchProjects();
        }
    }, [fetchProjects, token]);

    useEffect(() => {
        const fetchStudentProjects = async () => {
            try {
                const projectsList = await getAllStudentProjects(authHeader);
                setStudentProjects(projectsList.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchStudentProjects();
    }, [token]);

    const addNewProject = async (formData: ProjectFormData, studentId: number): Promise<any> => {
        try {
            const response = await addProject(formData, authHeader);
            setProjects([...projects, response.data]);
            if (response.statusCode === 201) {
                try {
                    const studentProj = await addStudentProject(studentId, response.data.project_id, authHeader);
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
            const response = await updateProject(projecct, projectId, authHeader);
            setProjects((prevProjects) => prevProjects.filter((project) => project.project_id !== projectId).concat(response.data));
            await fetchProjects();
            return response;
        } catch (error) {
            console.error("Failed to add modified Project:", error);
        }
    };

    const getProjectNotes = async (projectId: number) => {
        try {
            const response = await getNotes(projectId, authHeader);
            if (response.statusCode === 200) {
              setProjectNotes(response.data);
            return response.data;  
            } else {
                setProjectNotes([]);
            }   
        } catch (error) {
            console.error("Failed to fetch Project Notes:", error);
        }
    };

    const addProjectNote = async (projectId: number, note: NewNote): Promise<Note> => {
        try {
            const response = await createNote(projectId, note, authHeader);
            setProjectNotes([...projectNotes, response.data]);
            return response;
        } catch (error) {
            console.error("Failed to add Project Note:", error);
        }
    };

    let value = {
        projects,
        setProjects,
        studentProjects,
        addNewProject,
        modifyProject,
        projectNotes,
        getProjectNotes,
        addProjectNote,
        fetchProjects
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


