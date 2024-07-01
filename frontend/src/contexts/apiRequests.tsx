import axios from 'axios';
import { ProjectFormData } from '../interface/formData';
import { Resource } from '../interface/resource';


const baseUrl = import.meta.env.VITE_API_URL
// Projects API requests
export const addProject = async (formData: ProjectFormData) => {
    try {
        // verify the actual endpoint
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

// Companies API requests
export const getCompanies = async () => {
    try {
        const response = await axios.get(`${baseUrl}/companies`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
}

export const addNewCompany = async (company_name: string) => {
    try {
        const response = await axios.post(`${baseUrl}/companies`, { company_name });
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('An unexpected error:', error);
        }
    }
};
