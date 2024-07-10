import axios from 'axios';
import { ProjectFormData } from '../interface/formData';
import { Resource } from '../interface/resource';
import { FavoCompany } from '../interface/favoCompany';


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
    console.log('company_name:', company_name);
    try {
        const response = await axios.post(`${baseUrl}/companies`, { company_name });
        if (response.data.statusCode === 201) {
            alert('New Company added successfully.');
            console.log('New Company added successfully:', response.data);
            return response.data.data;
        } else {
            console.error('Unexpected status code:', response.data.statusCode);
            return null;
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

export const getFavoCompanies = async (teacher_id: number) => {
    try {
        const response = await axios.get(`${baseUrl}/companies/favo/${teacher_id}`);
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

export const addNewFavoCompany = async (companyFavourity: FavoCompany) => {
    try {
        const response = await axios.post(`${baseUrl}/companies/favo`, companyFavourity);
        if (response.data.statusCode === 201) {
            console.log('New company favourity added successfully:', response.data);
            return response.data.data;
        } else {
            console.error('Unexpected status code:', response.data.statusCode);
            return null;
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

export const deleteFavoCompanies = async (teacher_id: number) => {
    try {
        const response = await axios.delete(`${baseUrl}/companies/deleteFavo/${teacher_id}`);
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
}
