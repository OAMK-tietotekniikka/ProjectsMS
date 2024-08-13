import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import home from '../assets/home.svg';
import projects from '../assets/projects.svg';
import student from '../assets/student.svg';
import teacher from '../assets/teacher.svg';
import company from '../assets/company.svg';
import '../App.css';
const SidebarComponent = () => {
    const { t } = useTranslation();
    const { user, token } = useUserContext();
    return (_jsxs(Nav, { className: "sidebar-links", style: { padding: "1% 16%" }, children: [user === "student" && token !== "" && (_jsxs(_Fragment, { children: [_jsxs(NavLink, { to: "/student", className: "nav-link", children: [_jsx("img", { src: home, alt: "home" }), t('dashb')] }), _jsxs(NavLink, { to: "/form", className: "nav-link", children: [_jsx("img", { src: projects, alt: "projects" }), t('createProj')] })] })), user === "teacher" && token !== "" && (_jsxs(_Fragment, { children: [_jsxs(NavLink, { to: "/teacher", className: "nav-link", children: [_jsx("img", { src: home, alt: "home" }), t('dashb')] }), _jsxs(NavLink, { to: "/teachers", className: "nav-link", children: [_jsx("img", { src: teacher, alt: "teacher" }), t('teachers')] }), _jsxs(NavLink, { to: "/students", className: "nav-link", children: [_jsx("img", { src: student, alt: "student" }), t('students')] }), _jsxs(NavLink, { to: "/companies", className: "nav-link", children: [_jsx("img", { src: company, alt: "company", style: { height: "18px", width: "18px" } }), t('companies')] })] }))] }));
};
export default SidebarComponent;
