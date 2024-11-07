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
// Teachers API requests
export const getTeachers = (authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios.get(`${baseUrl}/teachers`, authHeader);
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
export const getTeachersByCompany = (company_name, authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const response = yield axios.get(`${baseUrl}/teachers/company/${company_name}`, authHeader);
        if (response.data.statusCode === 200) {
            return response.data;
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
export const createTeacher = (teacher, authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const response = yield axios.post(`${baseUrl}/teachers`, teacher, authHeader);
        if (response.data.statusCode === 201) {
            return response.data;
        }
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
export const getTeacher = (email, authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const response = yield axios.get(`${baseUrl}/teachers/${email}`, authHeader);
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
// Resources API requests
export const getResources = (authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const response = yield axios.get(`${baseUrl}/resources`, authHeader);
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
export const updateResource = (resource_id, resource, authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    try {
        const response = yield axios.put(`${baseUrl}/resources/${resource_id}`, resource, authHeader);
        return response.data;
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
export const createResource = (resource, authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        const response = yield axios.post(`${baseUrl}/resources`, resource, authHeader);
        if (response.data.statusCode === 201) {
            alert('New resource created successfully.');
            return response.data;
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_o = error.response) === null || _o === void 0 ? void 0 : _o.data);
            return (_p = error.response) === null || _p === void 0 ? void 0 : _p.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
