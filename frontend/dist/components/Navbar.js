import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
const NavbarComponent = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (_jsx(Navbar, Object.assign({ className: "bg-body-tertiary justify-content-between" }, { children: _jsxs(Container, { children: [_jsx(Navbar.Brand, { children: t('appName') }), _jsx(Navbar.Toggle, {}), _jsxs(Navbar.Collapse, Object.assign({ className: "justify-content-end" }, { children: [_jsx("div", Object.assign({ className: 'nav-home' }, { children: _jsx(Nav.Link, Object.assign({ href: "/" }, { children: t('home') })) })), _jsxs("div", Object.assign({ className: "nav-language" }, { children: [_jsx(Nav.Link, Object.assign({ onClick: () => changeLanguage("fi") }, { children: "FI" })), _jsx(Nav.Item, { children: "|" }), _jsx(Nav.Link, Object.assign({ onClick: () => changeLanguage("en") }, { children: "EN" }))] })), _jsx("div", { children: _jsx(Nav.Link, { children: t('login') }) })] }))] }) })));
};
export default NavbarComponent;
