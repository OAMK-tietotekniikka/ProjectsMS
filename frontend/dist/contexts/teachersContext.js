var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import axios from "axios";
const TeachersContext = React.createContext({});
const TeachersContextProvider = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [resources, setResources] = useState([]);
    useEffect(() => {
        const fetchTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios.get("http://localhost:8081/teachers");
                setTeachers(response.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchTeachers();
    }, []);
    useEffect(() => {
        const fetchResources = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios.get("http://localhost:8081/resources");
                setResources(response.data);
            }
            catch (error) {
                console.error("Failed to fetch data:", error);
            }
        });
        fetchResources();
    }, []);
    let value = {
        teachers,
        setTeachers,
        resources,
        setResources
    };
    return (_jsx(TeachersContext.Provider, Object.assign({ value: value }, { children: props.children })));
};
export const useTeachersContext = () => {
    const context = React.useContext(TeachersContext);
    if (!context) {
        throw new Error("useTeachersContext must be used within a TeachersContextProvider");
    }
    return context;
};
export default TeachersContextProvider;
