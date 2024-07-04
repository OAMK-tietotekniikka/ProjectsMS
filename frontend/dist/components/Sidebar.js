import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const SidebarComponent = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (_jsxs(Nav, Object.assign({ className: "flex-column bg-light", style: { height: '100vh', padding: '10px' } }, { children: [_jsx(Nav.Link, Object.assign({ href: "/" }, { children: t('home') })), _jsx(Nav.Link, Object.assign({ href: "/form" }, { children: t('createProj') }))] })));
};
export default SidebarComponent;
