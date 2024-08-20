import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
const NavbarComponent = () => {
    const { t, i18n } = useTranslation();
    const { token, logout } = useUserContext();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (_jsx(Navbar, { className: "navbar bg-body-tertiary", children: _jsxs(Container, { className: "nav-mainbar", children: [_jsx(Navbar.Brand, { className: 'nav-brand', children: t('appName') }), _jsx(Navbar.Toggle, {}), _jsxs(Navbar.Collapse, { className: "justify-content-end", children: [_jsx("div", { className: 'nav-home', children: _jsx(Nav.Link, { onClick: () => localStorage.setItem('user', ""), href: "/", children: t('home') }) }), _jsxs("div", { className: "nav-language", children: [_jsx(Nav.Link, { onClick: () => changeLanguage("fi"), children: "FI" }), _jsx(Nav.Item, { children: "|" }), _jsx(Nav.Link, { onClick: () => changeLanguage("en"), children: "EN" })] }), _jsx("div", { children: _jsx(Nav.Link, { onClick: logout, children: token !== "" ? t('logout') : "" }) })] })] }) }));
};
export default NavbarComponent;
