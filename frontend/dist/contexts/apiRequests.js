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
// Projects API requests
export const addProject = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // verify the actual endpoint
        const response = yield axios.post(`${baseUrl}/projects`, formData);
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
// Teachers API requests
export const getTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        // verify the actual endpoint
        const response = yield axios.get(`${baseUrl}/teachers`);
        return response.data;
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
export const getTeachersByCompany = (company_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const response = yield axios.get(`${baseUrl}/teachers/company/${company_name}`);
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
// Resources API requests
export const getResources = () => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const response = yield axios.get(`${baseUrl}/resources`);
        return response.data;
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
// Companies API requests
export const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const response = yield axios.get(`${baseUrl}/companies`);
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
export const addNewCompany = (company_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    try {
        const response = yield axios.post(`${baseUrl}/companies`, { company_name });
        return response.data.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_l = error.response) === null || _l === void 0 ? void 0 : _l.data);
            return (_m = error.response) === null || _m === void 0 ? void 0 : _m.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
