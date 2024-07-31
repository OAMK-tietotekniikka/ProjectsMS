import axios from 'axios';
import { Resource, NewResource } from '../../interface/resource';


const baseUrl = import.meta.env.VITE_API_URL

// Teachers API requests
export const getTeachers = async () => {
    try {
        // verify the actual endpoint
        const response = await axios.get(`${baseUrl}/teachers`);
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

export const getTeachersByCompany = async (company_name: string) => {
    try {
        const response = await axios.get(`${baseUrl}/teachers/company/${company_name}`);
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

// Resources API requests
export const getResources = async () => {
    try {
        const response = await axios.get(`${baseUrl}/resources`);
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

export const updateResource = async (resource_id: number, resource: Resource) => {
    try {
        const response = await axios.put(`${baseUrl}/resources/${resource_id}`, resource);
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

export const createResource = async (resource: NewResource) => {
    try {
        const response = await axios.post(`${baseUrl}/resources`, resource);
        if (response.data.statusCode === 201) {
            alert('New resource created successfully.');
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