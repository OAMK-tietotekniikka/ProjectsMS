// import axios from 'axios';
// import { UpdatedStudent } from '../../interface/student';


// const baseUrl = import.meta.env.VITE_API_URL

// // Students API requests

// export const getStudents = async (authHeader: any) => {
//     try {
//         const response = await axios.get(`${baseUrl}/students`, authHeader);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Failed to write data:', error.response?.data);
//             return error.response?.data;
//         } else {
//             console.error('An unexpected error:', error);
//         }
//     }
// };

// export const updateStudent = async (student: UpdatedStudent, studentId: number, authHeader: any) => {
//     try {
//         const response = await axios.put(`${baseUrl}/students/${studentId}`, student, authHeader);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Failed to write data:', error.response?.data);
//             return error.response?.data;
//         } else {
//             console.error('An unexpected error:', error);
//         }
//     }
// };

import axios from 'axios';
import { UpdatedStudent } from '../../interface/student';

const baseUrl = import.meta.env.VITE_API_URL;

// Students API requests

export const getStudents = async (token: string) => {
    try {
        const response = await axios.get(`${baseUrl}/students`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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

export const updateStudent = async (student: UpdatedStudent, studentId: number, token: string) => {
    try {
        const response = await axios.put(`${baseUrl}/students/${studentId}`, student, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to update data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};