import axios from 'axios';
import { UpdatedStudent, newStudent } from '../../interface/student';


const baseUrl = import.meta.env.VITE_API_URL

// Students API requests

export const getStudents = async (authHeader: any) => {
    try {
        const response = await axios.get(`${baseUrl}/students`, authHeader);
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

export const getStudent = async (email: string, authHeader: any) => {
    console.log("From requests: ", email);
    try {
        const response = await axios.get(`${baseUrl}/students/${email}`, authHeader);
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

export const createStudent = async (student: newStudent, authHeader: any) => {
    try {
        const response = await axios.post(`${baseUrl}/students`, student, authHeader);
        if (response.data.statusCode === 201) {
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

export const updateStudent = async (student: UpdatedStudent, studentId: number, authHeader: any) => {
    try {
        const response = await axios.put(`${baseUrl}/students/${studentId}`, student, authHeader);
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

