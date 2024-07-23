import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import checkboxImage from '../../assets/checkbox.svg';
import squareImage from '../../assets/square.svg';
import SelectionDropdown from './SelectionDropdown';
const OngoingProjectsList = ({ teacherId }) => {
    const { t } = useTranslation();
    const { projects, studentProjects, modifyProject } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByName'];
    const [modifiedProjectData, setModifiedProjectData] = useState(null);
    const [show, setShow] = useState(false);
    const [studentName, setStudentName] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const projectsForSignedInTeacher = (projects === null || projects === void 0 ? void 0 : projects.filter(project => project.teacher_id === teacherId && (project.project_status === 'pending' || project.project_status === 'ongoing'))) || [];
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
    const dataToDisplay = (selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0 ? selectedData : projectsWithStudents || [];
    const handleChecked = (project) => {
        const currentDate = new Date();
        const newProjectData = {
            project_name: project.project_name,
            project_desc: project.project_desc,
            teacher_id: project.teacher_id,
            company_id: project.company_id,
            project_status: 'completed',
            project_url: project.project_url,
            start_date: project.start_date,
            end_date: currentDate,
        };
        console.log('New project data:', newProjectData);
        setModifiedProjectData(newProjectData);
        setStudentName(project.name);
        setShow(true);
        //
        setSelectedProjectId(project.project_id);
    };
    const handleRowClick = (project) => {
        console.log('Project selected:', project);
        // add code to navigate to project details page
    };
    const handleConfirm = () => {
        if (modifiedProjectData) {
            modifyProject(modifiedProjectData, selectedProjectId);
            setModifiedProjectData(null);
            setSelectedProjectId(null);
            setShow(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(SelectionDropdown, { data: projectsWithStudents, options: selectionOptions, toggle: 'selectStudents', setSelectedData: setSelectedData }) }), _jsx("div", { className: "projects-table", children: _jsxs(Table, { hover: true, size: 'sm', className: "table-custom", children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px" }, children: [_jsx("th", {}), _jsx("th", { children: t('studyGroup') }), _jsx("th", { children: t('started') }), _jsx("th", { children: t('ended') }), _jsx("th", { children: t('company') }), _jsx("th", { children: t('projectNo') }), _jsx("th", { children: t('setEnded') })] }) }), _jsx("tbody", { children: dataToDisplay.map((proj) => (_jsxs("tr", { style: { fontSize: "13px" }, onClick: () => handleRowClick(proj), children: [_jsxs("td", { className: "align-middle", style: { display: "flex", flexDirection: "column" }, children: [_jsx("div", { style: { fontWeight: "bold" }, children: proj.name }), _jsx("div", { children: proj.student_email })] }), _jsx("td", { children: (proj.class_code).toUpperCase() }), _jsx("td", { children: String(proj.start_date).split('T')[0] }), _jsx("td", { children: String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0] }), _jsx("td", { children: proj.company_name }), _jsx("td", { children: proj.project_number }), _jsx("td", { children: _jsx("button", { style: { height: "20px", width: "20px", marginLeft: "20% ", padding: "0", border: "none" }, onClick: (e) => { e.stopPropagation(); handleChecked(proj); }, children: _jsx("img", { src: selectedProjectId === proj.project_id ? checkboxImage : squareImage, alt: "tick" }) }) })] }, proj.project_id))) })] }) }), _jsxs(Modal, { show: show, onHide: () => { handleClose(); setSelectedProjectId(null); }, animation: false, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: t('projCloseModalTitle') }) }), _jsx(Modal.Body, { children: _jsxs("div", { children: [_jsxs("h6", { children: [t('modifiedData'), ":"] }), _jsxs("div", { children: [t('studName'), ": ", studentName] }), _jsxs("div", { children: [t('projName'), ": ", modifiedProjectData === null || modifiedProjectData === void 0 ? void 0 : modifiedProjectData.project_name] }), _jsxs("div", { children: [t('dueDate'), ": ", modifiedProjectData === null || modifiedProjectData === void 0 ? void 0 : modifiedProjectData.end_date.toISOString().split('T')[0]] }), _jsxs("div", { children: [t('status'), ": ", modifiedProjectData === null || modifiedProjectData === void 0 ? void 0 : modifiedProjectData.project_status] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", onClick: () => { handleClose(); setSelectedProjectId(null); }, children: t('goBack') }), _jsx(Button, { style: { backgroundColor: "#F7921E" }, onClick: () => handleConfirm(), children: t('yesSave') })] })] })] }));
};
export default OngoingProjectsList;
