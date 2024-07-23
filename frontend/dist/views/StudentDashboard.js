import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useStudentsContext } from '../contexts/studentsContext';
import { useProjectsContext } from '../contexts/projectsContext';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const StudentDashboard = () => {
    const { t } = useTranslation();
    const { students, signedInStudent } = useStudentsContext();
    const { projects, studentProjects } = useProjectsContext();
    const { teachers } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const navigate = useNavigate();
    const studentId = signedInStudent.student_id || null;
    const studentProjectsList = studentProjects.filter(project => project.student_id === studentId);
    const studentProjectsWithData = studentProjectsList.map(project => {
        var _a, _b, _c;
        const projectData = projects.find(proj => proj.project_id === project.project_id);
        return Object.assign(Object.assign({}, project), { project_name: projectData === null || projectData === void 0 ? void 0 : projectData.project_name, project_description: projectData === null || projectData === void 0 ? void 0 : projectData.project_desc, project_status: projectData === null || projectData === void 0 ? void 0 : projectData.project_status, teacher_name: ((_a = teachers.find(teacher => teacher.teacher_id === (projectData === null || projectData === void 0 ? void 0 : projectData.teacher_id))) === null || _a === void 0 ? void 0 : _a.first_name) + ' ' + ((_b = teachers.find(teacher => teacher.teacher_id === (projectData === null || projectData === void 0 ? void 0 : projectData.teacher_id))) === null || _b === void 0 ? void 0 : _b.last_name), company_name: (_c = companies.find(company => company.company_id === (projectData === null || projectData === void 0 ? void 0 : projectData.company_id))) === null || _c === void 0 ? void 0 : _c.company_name, start_date: projectData === null || projectData === void 0 ? void 0 : projectData.start_date, end_date: projectData === null || projectData === void 0 ? void 0 : projectData.end_date, project_url: projectData === null || projectData === void 0 ? void 0 : projectData.project_url, studentsInvolved: studentProjects.filter(proj => proj.project_id === project.project_id).map(student => { var _a, _b; return ((_a = students.find(stud => stud.student_id === student.student_id)) === null || _a === void 0 ? void 0 : _a.first_name) + ' ' + ((_b = students.find(stud => stud.student_id === student.student_id)) === null || _b === void 0 ? void 0 : _b.last_name); }) });
    });
    return (_jsx(Container, { className: 'student-main-container', children: _jsxs(Row, { className: "student-main-row", children: [_jsxs(Col, { xs: "12", lg: "8", children: [signedInStudent ?
                            _jsxs("div", { children: [_jsxs("h4", { children: [signedInStudent.first_name, " ", signedInStudent.last_name] }), _jsx("div", { style: { fontSize: "small" }, children: signedInStudent.email }), _jsx("div", { style: { fontSize: "small" }, children: signedInStudent.class_code.toUpperCase() })] })
                            : "No student data", studentProjectsList.length > 0 ?
                            _jsxs(_Fragment, { children: [_jsx("div", { style: { marginTop: "4%" }, children: t('projListBelow') }), _jsx("hr", {}), _jsxs(Row, { children: [_jsx(Col, { className: "heading-row" }), _jsx(Col, { className: "heading-row", children: t('company') }), _jsx(Col, { className: "heading-row", children: t('startDate') }), _jsx(Col, { className: "heading-row", children: t('dueDate') })] }), studentProjectsWithData.map(proj => (_jsxs(Row, { className: "data-row", onClick: () => navigate(`/studentProject/${proj.project_id}`, { state: { proj } }), children: [_jsxs(Col, { className: "data-item", style: { color: "#5e5e5e", fontWeight: "bold" }, children: [t('projectNo'), " ", proj.project_number] }), _jsx(Col, { className: "data-item", children: proj.company_name }), _jsx(Col, { className: "data-item", children: String(proj.start_date).split('T')[0] }), _jsx(Col, { className: "data-item", children: String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0] })] }, proj.project_id)))] })
                            : _jsx("div", { className: "second-heading", children: t('noProject') }), _jsx("hr", {})] }), _jsx(Col, { xs: "12", lg: "4", style: { marginTop: "25%" }, children: _jsx(Button, { href: "/form", variant: "primary", size: "sm", style: { width: "200px" }, children: t('createProj') }) })] }) }));
};
export default StudentDashboard;
