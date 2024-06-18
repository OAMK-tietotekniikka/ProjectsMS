import axios from 'axios';
import { ProjectFormData } from '../interface/formData';

// port number is 8080 with OpenShift deployment
const baseUrl = import.meta.env.VITE_API_URL

export const addProject = async (formData: ProjectFormData) => {
    try {
        // verify the actual endpoint
        const response = await axios.post(`${baseUrl}/projects`, formData);
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