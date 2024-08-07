// frontend/src/components/Sidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import home from '../assets/home.svg';
import projects from '../assets/projects.svg';
import student from '../assets/student.svg';
import teacher from '../assets/teacher.svg';
import company from '../assets/company.svg';
import '../App.css'


const SidebarComponent: React.FC = () => {
    const { t } = useTranslation();
    const { user, token } = useUserContext();

    return (
        <Nav className="sidebar-links" style={{ padding: "1% 16%" }} >
            {user === "student" && token !== "" && (
                <>
                    <NavLink to="/student" className="nav-link">
                        <img src={home} alt="home" />
                        {t('dashb')}
                    </NavLink>
                    <NavLink to="/form" className="nav-link">
                        <img src={projects} alt="projects" />
                        {t('createProj')}
                    </NavLink>

                </>
            )}
            {user === "teacher" && token !== "" && (
                <>
                    <NavLink to="/teacher" className="nav-link">
                        <img src={home} alt="home" />
                        {t('dashb')}
                    </NavLink>
                    <NavLink to="/teachers" className="nav-link">
                        <img src={teacher} alt="teacher" />
                        {t('teachers')}
                    </NavLink>
                    <NavLink to="/students" className="nav-link">
                        <img src={student} alt="student" />
                        {t('students')}
                    </NavLink>
                    <NavLink to="/companies" className="nav-link" >
                        <img src={company} alt="company" style={{ height: "18px", width: "18px" }} />
                        {t('companies')}
                    </NavLink>
                    {/* Add more teacher-specific links as needed */}
                </>
            )}
        </Nav>

    );
};

export default SidebarComponent;