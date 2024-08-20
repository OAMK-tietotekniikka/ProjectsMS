import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import home from '../assets/home.svg';
import projects from '../assets/projects.svg';
import student from '../assets/student.svg';
import teacher from '../assets/teacher.svg';
import company from '../assets/company.svg';
import '../App.css';
import menu from '../assets/hamburgerMenu.svg';

const SidebarComponent: React.FC = () => {
    const { t } = useTranslation();
    const { user, token } = useUserContext();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            {/* Hamburger Button for small screens */}
            <div className="hamburger-container d-md-none">
                <Button variant="light" onClick={handleShow}>
                    <img src={menu} alt="menu" style={{ height: "24px", width: "24x"}} />
                </Button>
            </div>

            {/* Static Sidebar for large screens */}
            <Nav className="sidebar-links d-none d-md-flex">
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
                        <NavLink to="/companies" className="nav-link">
                            <img src={company} alt="company" style={{ height: "18px", width: "18px" }} />
                            {t('companies')}
                        </NavLink>
                    </>
                )}
            </Nav>

            {/* Offcanvas Sidebar for small screens */}
            <Offcanvas show={showSidebar} onHide={handleClose} className="d-md-none">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{t('menu')}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="sidebar-links">
                        {user === "student" && token !== "" && (
                            <>
                                <NavLink to="/student" className="nav-link" onClick={handleClose}>
                                    <img src={home} alt="home" />
                                    {t('dashb')}
                                </NavLink>
                                <NavLink to="/form" className="nav-link" onClick={handleClose}>
                                    <img src={projects} alt="projects" />
                                    {t('createProj')}
                                </NavLink>
                            </>
                        )}
                        {user === "teacher" && token !== "" && (
                            <>
                                <NavLink to="/teacher" className="nav-link" onClick={handleClose}>
                                    <img src={home} alt="home" />
                                    {t('dashb')}
                                </NavLink>
                                <NavLink to="/teachers" className="nav-link" onClick={handleClose}>
                                    <img src={teacher} alt="teacher" />
                                    {t('teachers')}
                                </NavLink>
                                <NavLink to="/students" className="nav-link" onClick={handleClose}>
                                    <img src={student} alt="student" />
                                    {t('students')}
                                </NavLink>
                                <NavLink to="/companies" className="nav-link" onClick={handleClose}>
                                    <img src={company} alt="company" style={{ height: "18px", width: "18px" }} />
                                    {t('companies')}
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SidebarComponent;
