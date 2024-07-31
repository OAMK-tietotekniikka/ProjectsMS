import axios from 'axios';
import { ProjectFormData } from '../../interface/formData';
import {NewNote } from '../../interface/newNote';


const baseUrl = import.meta.env.VITE_API_URL

// Projects API requests
export const addProject = async (formData: ProjectFormData) => {
    try {
        const response = await axios.post(`${baseUrl}/projects`, formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

export const getAllProjects = async () => {
    try {
        const response = await axios.get(`${baseUrl}/projects`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

export const addStudentProject = async (studentId: number, projectId: number) => {
    try {
        const response = await axios.post(`${baseUrl}/projects/student`, { student_id: studentId, project_id: projectId });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

export const getAllStudentProjects = async () => {
    try {
        const response = await axios.get(`${baseUrl}/projects/student`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

export const updateProject = async (projectData: ProjectFormData, projectId: number) => {
    try {
        const response = await axios.put(`${baseUrl}/projects/${projectId}`, projectData);
        if (response.data.statusCode === 200) {
            alert('Project data updated successfully.');
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

// Project notes API requests

export const getNotes = async (projectId: number) => {
    try {
        const response = await axios.get(`${baseUrl}/projects/${projectId}/notes`);
        return response.data;
    } catch (error) {
        console.error('Failed to write data:', error.response?.data);
        return error.response?.data;
    }
};

export const createNote = async (projectId: number, note: NewNote) => {
    try {
        const response = await axios.post(`${baseUrl}/projects/${projectId}/addNote`, note);
        if (response.data.statusCode === 201) {
            alert('New note created successfully.');
            return response.data;
        }
    } catch (error) {
        console.error('Failed to write data:', error.response?.data);
        return error.response?.data;
    }
};



