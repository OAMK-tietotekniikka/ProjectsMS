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