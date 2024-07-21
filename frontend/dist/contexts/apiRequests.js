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
export const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const response = yield axios.get(`${baseUrl}/projects`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch data:', (_c = error.response) === null || _c === void 0 ? void 0 : _c.data);
            return (_d = error.response) === null || _d === void 0 ? void 0 : _d.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const addStudentProject = (studentId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const response = yield axios.post(`${baseUrl}/projects/student`, { student_id: studentId, project_id: projectId });
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
export const getAllStudentProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const response = yield axios.get(`${baseUrl}/projects/student`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to fetch data:', (_g = error.response) === null || _g === void 0 ? void 0 : _g.data);
            return (_h = error.response) === null || _h === void 0 ? void 0 : _h.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const updateProject = (projectData, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const response = yield axios.put(`${baseUrl}/projects/${projectId}`, projectData);
        if (response.data.statusCode === 200) {
            alert('Project data updated successfully.');
            return response.data;
        }
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
// Teachers API requests
export const getTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    try {
        // verify the actual endpoint
        const response = yield axios.get(`${baseUrl}/teachers`);
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
export const getTeachersByCompany = (company_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        const response = yield axios.get(`${baseUrl}/teachers/company/${company_name}`);
        return response.data;
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
// Resources API requests
export const getResources = () => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r;
    try {
        const response = yield axios.get(`${baseUrl}/resources`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_q = error.response) === null || _q === void 0 ? void 0 : _q.data);
            return (_r = error.response) === null || _r === void 0 ? void 0 : _r.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const updateResource = (resource_id, resource) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t;
    try {
        const response = yield axios.put(`${baseUrl}/resources/${resource_id}`, resource);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_s = error.response) === null || _s === void 0 ? void 0 : _s.data);
            return (_t = error.response) === null || _t === void 0 ? void 0 : _t.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const createResource = (resource) => __awaiter(void 0, void 0, void 0, function* () {
    var _u, _v;
    try {
        const response = yield axios.post(`${baseUrl}/resources`, resource);
        if (response.data.statusCode === 201) {
            alert('New resource created successfully.');
            return response.data;
        }
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_u = error.response) === null || _u === void 0 ? void 0 : _u.data);
            return (_v = error.response) === null || _v === void 0 ? void 0 : _v.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
// Companies API requests
export const getCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    var _w, _x;
    try {
        const response = yield axios.get(`${baseUrl}/companies`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_w = error.response) === null || _w === void 0 ? void 0 : _w.data);
            return (_x = error.response) === null || _x === void 0 ? void 0 : _x.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const addNewCompany = (company_name) => __awaiter(void 0, void 0, void 0, function* () {
    var _y, _z;
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
            console.error('Failed to write data:', (_y = error.response) === null || _y === void 0 ? void 0 : _y.data);
            return (_z = error.response) === null || _z === void 0 ? void 0 : _z.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const getFavoCompanies = (teacher_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _0, _1;
    try {
        const response = yield axios.get(`${baseUrl}/companies/favo/${teacher_id}`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_0 = error.response) === null || _0 === void 0 ? void 0 : _0.data);
            return (_1 = error.response) === null || _1 === void 0 ? void 0 : _1.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const addNewFavoCompany = (companyFavourity) => __awaiter(void 0, void 0, void 0, function* () {
    var _2, _3;
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
            console.error('Failed to write data:', (_2 = error.response) === null || _2 === void 0 ? void 0 : _2.data);
            return (_3 = error.response) === null || _3 === void 0 ? void 0 : _3.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
export const deleteFavoCompanies = (teacher_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _4, _5;
    try {
        const response = yield axios.delete(`${baseUrl}/companies/deleteFavo/${teacher_id}`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_4 = error.response) === null || _4 === void 0 ? void 0 : _4.data);
            return (_5 = error.response) === null || _5 === void 0 ? void 0 : _5.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
// Students API requests
export const getStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    var _6, _7;
    try {
        const response = yield axios.get(`${baseUrl}/students`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_6 = error.response) === null || _6 === void 0 ? void 0 : _6.data);
            return (_7 = error.response) === null || _7 === void 0 ? void 0 : _7.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
// Email API requests
export const sendEmailNotification = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    var _8, _9;
    try {
        const response = yield axios.post(`${baseUrl}/email`, { to, subject, text });
        return response;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to write data:', (_8 = error.response) === null || _8 === void 0 ? void 0 : _8.data);
            return (_9 = error.response) === null || _9 === void 0 ? void 0 : _9.data;
        }
        else {
            console.error('An unexpected error:', error);
        }
    }
});
