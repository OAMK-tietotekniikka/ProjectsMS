import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const LandingPageNewEntra = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const { instance } = useMsal();
    const handleClick = (e) => {
        e.preventDefault();
        setUser("teacher");
        instance.loginRedirect(loginRequest)
            .catch(e => {
            console.log(e);
        });
        if (instance.getActiveAccount()) {
            console.log("User logged in");
            return "ok";
        }
        else {
            return null;
        }
    };
    return (_jsx(Container, { className: 'main-container', children: _jsx(Row, { className: "d-flex justify-content-center", children: _jsxs(Col, { lg: 8, children: [_jsx("h5", { children: t('welcome') }), _jsx("h6", { style: { marginTop: "6%" }, children: "Please sign in here:" }), _jsx(Button, { className: 'submit-login', onClick: (e) => handleClick(e), children: t('login') }), _jsx("h6", { style: { marginTop: "6%" }, children: "You will be redirected to dasboard view after successful login." })] }) }) }));
};
export default LandingPageNewEntra;
