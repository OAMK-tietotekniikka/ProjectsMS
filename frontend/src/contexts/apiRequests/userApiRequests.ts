import axios from 'axios';
import { UserLogin } from '../../interface/userLogin';


const baseUrl = import.meta.env.VITE_API_URL

// Email API requests

export const sendEmailNotification = async (to: string, subject: string, text: string) => {
    try {
        const response = await axios.post(`${baseUrl}/email`, { to, subject, text });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};

// Login API requests

export const studentLogin = async (loginData: UserLogin) => {
    try {
        const response = await axios.post(`${baseUrl}/students/login`, loginData);
        if (response.data.message === "Student authenticated") {
            alert('Login successful');
            return response.data;
        } else {
            console.error('Unexpected response:', response.data);
            return null;
        }
    } catch (error) {
        return error.response.data;
    }
};

export const teacherLogin = async (loginData: UserLogin) => {
    try {
        const response = await axios.post(`${baseUrl}/teachers/login`, loginData);
        if (response.data.message === "Teacher authenticated") {
            alert('Login successful');
            return response.data;
        } else {
            
            console.error('Unexpected response:', response.data);
            return null;
        }
    } catch (error) {
        return error.response.data;
    }
};