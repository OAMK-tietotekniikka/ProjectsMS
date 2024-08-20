import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import { getStudyYear } from '../GetStudyYear';
import SelectionDropdown from './SelectionDropdown';
const PastProjectsList = ({ teacherId }) => {
    const { t } = useTranslation();
    const { projects, studentProjects } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [selectedData, setSelectedData] = useState([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByYear', 'selectByName'];
    const navigate = useNavigate();
    const projectsForSignedInTeacher = (projects === null || projects === void 0 ? void 0 : projects.filter(project => project.teacher_id === teacherId && (project.project_status === 'completed'))) || [];
    // add company_name to items in projectsForSignedInTeacher array using company_id and companies array
    const projectsWithCompanyNames = projectsForSignedInTeacher.map((project) => {
        const company = companies === null || companies === void 0 ? void 0 : companies.find((company) => company.company_id === project.company_id);
        return Object.assign(Object.assign({}, project), { company_name: (company === null || company === void 0 ? void 0 : company.company_name) || 'Unknown Company' });
    });
    // Add projectNo and student name to items in projectsWithCompanyNames array using student_id and studentProjects array
    const projectsWithStudents = projectsWithCompanyNames.map((project) => {
        var _a, _b;
        const studentProject = studentProjects === null || studentProjects === void 0 ? void 0 : studentProjects.find((studentProject) => studentProject.project_id === project.project_id);
        const student = students === null || students === void 0 ? void 0 : students.find((student) => student.student_id === (studentProject === null || studentProject === void 0 ? void 0 : studentProject.student_id));
        const studentName = student ? `${(_a = student.first_name) !== null && _a !== void 0 ? _a : ''} ${(_b = student.last_name) !== null && _b !== void 0 ? _b : ''}`.trim() : 'Unknown';
        return Object.assign(Object.assign({}, project), { project_number: (studentProject === null || studentProject === void 0 ? void 0 : studentProject.project_number) || 'Unknown Project Number', name: studentName, student_email: (student === null || student === void 0 ? void 0 : student.email) || 'Unknown Email', class_code: (student === null || student === void 0 ? void 0 : student.class_code) || 'Unknown Class Code' });
    });
    const projectsWithStudyYears = projectsWithStudents.map((project) => {
        const date = new Date(project.end_date);
        const studyYear = getStudyYear(date);
        return Object.assign(Object.assign({}, project), { study_year: studyYear });
    });
    //sort by project end_date
    projectsWithStudyYears.sort((a, b) => {
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
    });
    const dataToDisplay = (selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0 ? selectedData : projectsWithStudyYears || [];
    const groupedData = dataToDisplay.reduce((groups, item) => {
        const studyYear = item.study_year;
        if (!groups[studyYear]) {
            groups[studyYear] = [];
        }
        groups[studyYear].push(item);
        return groups;
    }, {});
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(SelectionDropdown, { data: projectsWithStudyYears, options: selectionOptions, toggle: 'selectStudents', setSelectedData: setSelectedData }) }), _jsx("div", { className: "projects-table", children: _jsxs(Table, { hover: true, size: 'sm', className: "table-custom", children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px" }, children: [_jsx("th", {}), _jsx("th", { children: t('studyGroup') }), _jsx("th", { children: t('started') }), _jsx("th", { children: t('ended') }), _jsx("th", { children: t('company') }), _jsx("th", { children: t('projectNo') })] }) }), _jsx("tbody", { children: Object.keys(groupedData).map((studyYear) => (_jsxs(React.Fragment, { children: [_jsx("tr", { children: _jsx("td", { style: { fontWeight: 'bold' }, children: studyYear }) }), groupedData[studyYear].map((proj) => (_jsxs("tr", { style: { fontSize: "13px" }, onClick: () => navigate(`/studentProject/${proj.project_id}`, { state: { proj } }), children: [_jsxs("td", { className: "align-middle", style: { display: "flex", flexDirection: "column" }, children: [_jsx("div", { style: { fontWeight: "bold" }, children: proj.name }), _jsx("div", { children: proj.student_email })] }), _jsx("td", { children: proj.class_code.toUpperCase() }), _jsx("td", { children: String(proj.start_date).split('T')[0] }), _jsx("td", { children: String(proj.end_date).split('T')[0] }), _jsx("td", { children: proj.company_name }), _jsx("td", { children: proj.project_number })] }, proj.project_id)))] }, studyYear))) })] }) })] }));
};
export default PastProjectsList;
