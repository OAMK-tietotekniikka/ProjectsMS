import axios from 'axios';
import { FavoCompany } from '../../interface/favoCompany';


const baseUrl = import.meta.env.VITE_API_URL

// Companies API requests
export const getCompanies = async (authHeader: any) => {
    try {
        const response = await axios.get(`${baseUrl}/companies`, authHeader);
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

export const addNewCompany = async (company_name: string, authHeader: any) => {
    try {
        const response = await axios.post(`${baseUrl}/companies`, { company_name }, authHeader);
        if (response.data.statusCode === 201) {
            return response.data.data;
        } else {
            alert('There was an error when adding new company.');
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

export const getFavoCompanies = async (teacher_id: number, authHeader: any) => {
    try {
        const response = await axios.get(`${baseUrl}/companies/favo/${teacher_id}`, authHeader);
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

export const addNewFavoCompany = async (companyFavourity: FavoCompany, authHeader: any) => {
    try {
        const response = await axios.post(`${baseUrl}/companies/favo`, companyFavourity, authHeader);
        if (response.data.statusCode === 201) {
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

export const deleteFavoCompanies = async (teacher_id: number, authHeader: any) => {
    try {
        const response = await axios.delete(`${baseUrl}/companies/favo/${teacher_id}`, authHeader);
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

