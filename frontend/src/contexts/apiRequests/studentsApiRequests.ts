import axios from 'axios';


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

