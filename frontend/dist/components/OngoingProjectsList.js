import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../contexts/projectsContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useStudentsContext } from '../contexts/studentsContext';
import checkboxImage from '../assets/checkbox.svg';
import squareImage from '../assets/square.svg';
const OngoingProjectsList = () => {
    const { t } = useTranslation();
    const { projects, studentProjects } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [clickedProjectId, setClickedProjectId] = React.useState(null);
    const projectsForSignedInTeacher = (projects === null || projects === void 0 ? void 0 : projects.filter(project => project.teacher_id === 1 && (project.project_status === 'pending' || project.project_status === 'ongoing'))) || [];
    // add company_name to items in projectsForSignedInTeacher array using company_id and companies array
    const projectsWithCompanyNames = projectsForSignedInTeacher.map((project) => {
        const company = companies === null || companies === void 0 ? void 0 : companies.find((company) => company.company_id === project.company_id);
        return Object.assign(Object.assign({}, project), { company_name: (company === null || company === void 0 ? void 0 : company.company_name) || 'Unknown Company' });
    });
    // Add projectNo and student name to items in projectsWithCompanyNames array using student_id and studentProjects array
    const projectsWithStudents = projectsWithCompanyNames.map((project) => {
        const studentProject = studentProjects === null || studentProjects === void 0 ? void 0 : studentProjects.find((studentProject) => studentProject.project_id === project.project_id);
        const student = students === null || students === void 0 ? void 0 : students.find((student) => student.student_id === (studentProject === null || studentProject === void 0 ? void 0 : studentProject.student_id));
        return Object.assign(Object.assign({}, project), { project_number: (studentProject === null || studentProject === void 0 ? void 0 : studentProject.project_number) || 'Unknown Project Number', first_name: (student === null || student === void 0 ? void 0 : student.first_name) || 'Unknown', last_name: (student === null || student === void 0 ? void 0 : student.last_name) || 'Unknown', student_email: (student === null || student === void 0 ? void 0 : student.email) || 'Unknown Email', class_code: (student === null || student === void 0 ? void 0 : student.class_code) || 'Unknown Class Code' });
    });
    const handleChecked = (projectId) => {
        // This functionality is not implemented yet
        setClickedProjectId(projectId);
        // add code to set project status to 'ended' in the database
    };
    const handleRowClick = (project) => {
        console.log('Project clicked:', project);
        // add code to navigate to project details page
    };
    return (_jsx("div", { className: "projects-table", children: _jsxs(Table, { hover: true, size: 'sm', className: "table-custom", children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px" }, children: [_jsx("th", {}), _jsx("th", { children: t('studyGroup') }), _jsx("th", { children: t('started') }), _jsx("th", { children: t('ended') }), _jsx("th", { children: t('companyName') }), _jsx("th", { children: t('projectNo') }), _jsx("th", { children: t('setEnded') })] }) }), _jsx("tbody", { children: projectsWithStudents.map((proj) => (_jsxs("tr", { style: { fontSize: "13px" }, onClick: () => handleRowClick(proj), children: [_jsxs("td", { className: "align-middle", style: { display: "flex", flexDirection: "column" }, children: [_jsxs("div", { children: [proj.first_name, " ", proj.last_name] }), _jsx("div", { children: proj.student_email })] }), _jsx("td", { children: (proj.class_code).toUpperCase() }), _jsx("td", { children: String(proj.start_date).split('T')[0] }), _jsx("td", { children: String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0] }), _jsx("td", { children: proj.company_name }), _jsx("td", { children: proj.project_number }), _jsx("td", { children: _jsx("button", { style: { height: "20px", width: "20px", marginLeft: "20% ", padding: "0", border: "none" }, onClick: (e) => { e.stopPropagation(); handleChecked(proj.project_id); }, children: _jsx("img", { src: clickedProjectId === proj.project_id ? checkboxImage : squareImage, alt: "tick" }) }) })] }, proj.project_id))) })] }) }));
};
export default OngoingProjectsList;
