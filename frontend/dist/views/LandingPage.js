import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const LandingPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [selectedUser, setSelectedUser] = React.useState('');
    const [clickedButton, setClickedButton] = React.useState("");
    const handleClick = (e, user) => {
        e.preventDefault();
        setSelectedUser(user);
        setClickedButton(user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', selectedUser);
        setUser(selectedUser);
        navigate(`/${selectedUser}`);
    };
    return (_jsx(Container, Object.assign({ className: 'main-container' }, { children: _jsx(Row, Object.assign({ className: "d-flex justify-content-center" }, { children: _jsxs(Col, Object.assign({ lg: 8 }, { children: [_jsx("h5", { children: t('welcome') }), _jsx("h6", Object.assign({ style: { marginTop: "6%" } }, { children: t('login') })), _jsxs("div", Object.assign({ className: "login-buttons-div" }, { children: [_jsx(Button, Object.assign({ onClick: (e) => handleClick(e, "teacher"), className: `login-button ${clickedButton === "teacher" ? "active" : ""}`, variant: clickedButton === "teacher" ? "primary" : "outline-primary" }, { children: t('teacherLogin') })), _jsx(Button, Object.assign({ onClick: (e) => handleClick(e, "student"), className: `login-button ${clickedButton === "student" ? "active" : ""}`, variant: "primary" }, { children: t('studentLogin') }))] })), _jsxs(Form, Object.assign({ onSubmit: handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: 'form-item', controlId: "formBasicUsername" }, { children: [_jsx(Form.Label, { children: t('username') }), _jsx(Form.Control, { placeholder: t('enterUsername') })] })), _jsxs(Form.Group, Object.assign({ className: 'form-item', controlId: "formBasicPassword" }, { children: [_jsx(Form.Label, { children: t('password') }), _jsx(Form.Control, { type: "password", placeholder: t('enterPassword') })] })), _jsx(Button, Object.assign({ className: 'submit-login', variant: "primary", type: "submit" }, { children: t('login') }))] }))] })) })) })));
};
export default LandingPage;
