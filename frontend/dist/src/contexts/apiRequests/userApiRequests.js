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
// Email API requests
export const sendEmailNotification = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios.post(`${baseUrl}/email`, { to, subject, text });
        return response;
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
// Login API requests
export const studentLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.post(`${baseUrl}/students/login`, loginData);
        if (response.data.message === "Student authenticated") {
            return response.data;
        }
        else {
            console.error('Unexpected response:', response.data);
            return null;
        }
    }
    catch (error) {
        return error.response.data;
    }
});
export const teacherLogin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.post(`${baseUrl}/teachers/login`, loginData);
        if (response.data.message === "Teacher authenticated") {
            return response.data;
        }
        else {
            console.error('Unexpected response:', response.data);
            return null;
        }
    }
    catch (error) {
        return error.response.data;
    }
});
