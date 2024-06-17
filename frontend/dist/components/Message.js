import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
const Message = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            setMessage(response.data.message);
        })
            .catch(error => {
            console.error('Failed to fetch data:', error);
        });
    }, []);
    return (_jsxs("div", { children: [_jsx("div", { children: _jsx(Link, Object.assign({ to: "/form" }, { children: "Add Project" })) }), message] }));
};
export default Message;
