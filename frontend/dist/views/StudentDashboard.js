import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
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
    const { projects, studentProjects, fetchProjects } = useProjectsContext();
    const { teachers } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const navigate = useNavigate();
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    const studentId = (signedInStudent === null || signedInStudent === void 0 ? void 0 : signedInStudent.student_id) || null;
    const studentProjectsList = (studentProjects === null || studentProjects === void 0 ? void 0 : studentProjects.filter(project => project.student_id === studentId)) || [];
    const studentProjectsWithData = studentProjectsList === null || studentProjectsList === void 0 ? void 0 : studentProjectsList.map(project => {
        var _a;
        const projectData = projects === null || projects === void 0 ? void 0 : projects.find(proj => proj.project_id === project.project_id);
        const foundTeacher = teachers === null || teachers === void 0 ? void 0 : teachers.find(teacher => teacher.teacher_id === (projectData === null || projectData === void 0 ? void 0 : projectData.teacher_id));
        return Object.assign(Object.assign({}, project), { project_name: (projectData === null || projectData === void 0 ? void 0 : projectData.project_name) || "No project name", project_desc: (projectData === null || projectData === void 0 ? void 0 : projectData.project_desc) || "No project description", project_status: (projectData === null || projectData === void 0 ? void 0 : projectData.project_status) || "No project status", teacher_name: foundTeacher ? `${foundTeacher.first_name} ${foundTeacher.last_name}` : "no teacher", teacher_id: (projectData === null || projectData === void 0 ? void 0 : projectData.teacher_id) || "No teacher id", company_id: (projectData === null || projectData === void 0 ? void 0 : projectData.company_id) || "No company id", company_name: ((_a = companies === null || companies === void 0 ? void 0 : companies.find(company => company.company_id === (projectData === null || projectData === void 0 ? void 0 : projectData.company_id))) === null || _a === void 0 ? void 0 : _a.company_name) || "No company name", start_date: (projectData === null || projectData === void 0 ? void 0 : projectData.start_date) || "No start date", end_date: (projectData === null || projectData === void 0 ? void 0 : projectData.end_date) || "No end date", project_url: (projectData === null || projectData === void 0 ? void 0 : projectData.project_url) || "No project url", studentsInvolved: (studentProjects === null || studentProjects === void 0 ? void 0 : studentProjects.filter(proj => proj.project_id === project.project_id).map(student => { var _a, _b; return ((_a = students.find(stud => stud.student_id === student.student_id)) === null || _a === void 0 ? void 0 : _a.first_name) + ' ' + ((_b = students.find(stud => stud.student_id === student.student_id)) === null || _b === void 0 ? void 0 : _b.last_name); })) || "No students involved" });
    });
    return (_jsx(Container, { className: 'student-main-container', children: _jsxs(Col, { xs: "12", lg: "9", children: [_jsxs(Row, { children: [signedInStudent ?
                            _jsxs("div", { children: [_jsxs("h4", { children: [signedInStudent.first_name, " ", signedInStudent.last_name] }), _jsx("div", { style: { fontSize: "small" }, children: signedInStudent.email }), _jsx("div", { style: { fontSize: "small" }, children: signedInStudent.class_code.toUpperCase() })] })
                            : "No student data", studentProjectsList.length > 0 ?
                            _jsxs(_Fragment, { children: [_jsx("div", { style: { margin: "4% 0%" }, children: t('projListBelow') }), _jsx("hr", { style: { margin: "0" } }), _jsxs(Row, { children: [_jsx(Col, { className: "heading-row" }), _jsx(Col, { className: "heading-row", children: t('company') }), _jsx(Col, { className: "heading-row", children: t('startDate') }), _jsx(Col, { className: "heading-row", children: t('dueDate') })] }), studentProjectsWithData.map(proj => (_jsxs(Row, { className: "data-row", onClick: () => navigate(`/studentProject/${proj.project_id}`, { state: { proj } }), children: [_jsxs(Col, { className: "data-item", style: { color: "#5e5e5e", fontWeight: "bold" }, children: [t('projectNo'), " ", proj.project_number] }), _jsx(Col, { className: "data-item", children: proj.company_name }), _jsx(Col, { className: "data-item", children: String(proj.start_date).split('T')[0] }), _jsx(Col, { className: "data-item", children: String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0] })] }, proj.project_id)))] })
                            : _jsx("div", { className: "second-heading", children: t('noProjects') }), _jsx("hr", { style: { marginTop: "10px", marginBottom: "0px" } })] }), _jsx(Row, { children: _jsx(Button, { href: "/form", className: 'student-view-button', children: t('createProj') }) })] }) }));
};
export default StudentDashboard;
