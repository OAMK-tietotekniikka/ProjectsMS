var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;
// Companies API requests
export const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios.get(`${baseUrl}/companies`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            return (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const addNewCompany = (company_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    console.log('company_name:', company_name);
    try {
        const response = yield axios.post(`${baseUrl}/companies`, { company_name });
        if (response.data.statusCode === 201) {
            alert('New Company added successfully.');
            return response.data.data;
        }
        else {
            console.error('Unexpected status code:', response.data.statusCode);
            return null;
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_c = error.response) === null || _c === void 0 ? void 0 : _c.data);
            return (_d = error.response) === null || _d === void 0 ? void 0 : _d.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const getFavoCompanies = (teacher_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const response = yield axios.get(`${baseUrl}/companies/favo/${teacher_id}`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_e = error.response) === null || _e === void 0 ? void 0 : _e.data);
            return (_f = error.response) === null || _f === void 0 ? void 0 : _f.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const addNewFavoCompany = (companyFavourity) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const response = yield axios.post(`${baseUrl}/companies/favo`, companyFavourity);
        if (response.data.statusCode === 201) {
            return response.data.data;
        }
        else {
            console.error('Unexpected status code:', response.data.statusCode);
            return null;
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_g = error.response) === null || _g === void 0 ? void 0 : _g.data);
            return (_h = error.response) === null || _h === void 0 ? void 0 : _h.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const deleteFavoCompanies = (teacher_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const response = yield axios.delete(`${baseUrl}/companies/deleteFavo/${teacher_id}`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_j = error.response) === null || _j === void 0 ? void 0 : _j.data);
            return (_k = error.response) === null || _k === void 0 ? void 0 : _k.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
