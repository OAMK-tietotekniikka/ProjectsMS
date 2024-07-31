var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const { user, setUser, login } = useUserContext();
    const [clickedButton, setClickedButton] = React.useState("");
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    });
    const handleClick = (e, user) => {
        e.preventDefault();
        setClickedButton(user);
        setUser(user);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(Object.assign(Object.assign({}, loginData), { [name]: value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        localStorage.setItem('user', user);
        const resp = yield login(loginData);
        if (resp === "ok") {
            navigate(`/${user}`);
        }
    });
    return (_jsx(Container, { className: 'main-container', children: _jsx(Row, { className: "d-flex justify-content-center", children: _jsxs(Col, { lg: 8, children: [_jsx("h5", { children: t('welcome') }), _jsx("h6", { style: { marginTop: "6%" }, children: t('login') }), _jsxs("div", { className: "login-buttons-div", children: [_jsx(Button, { onClick: (e) => handleClick(e, "teacher"), className: `login-button ${clickedButton === "teacher" ? "active" : ""}`, variant: clickedButton === "teacher" ? "primary" : "outline-primary", children: t('teacherLogin') }), _jsx(Button, { onClick: (e) => handleClick(e, "student"), className: `login-button ${clickedButton === "student" ? "active" : ""}`, variant: "primary", children: t('studentLogin') })] }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: 'form-item', controlId: "formBasicUsername", children: [_jsx(Form.Label, { children: t('username') }), _jsx(Form.Control, { type: "email", name: "email", placeholder: t('enterUsername'), value: loginData.email, onChange: handleChange })] }), _jsxs(Form.Group, { className: 'form-item', controlId: "formBasicPassword", children: [_jsx(Form.Label, { children: t('password') }), _jsx(Form.Control, { type: "password", name: "password", placeholder: t('enterPassword'), value: loginData.password, onChange: handleChange })] }), _jsx(Button, { className: 'submit-login', type: "submit", disabled: loginData.email === "" || loginData.password === "" || user === "", children: t('login') })] })] }) }) }));
};
export default LandingPage;
