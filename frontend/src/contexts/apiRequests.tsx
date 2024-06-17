import axios from 'axios';
import { ProjectFormData } from '../interface/formData';

const baseUrl = 'http://localhost:8081';

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