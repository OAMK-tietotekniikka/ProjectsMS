import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import DocumentsListing from "../components/StudentUI/DocumentsListing";
import NotesListing from "../components/StudentUI/NotesListing";
import ChangeProjectStatus from "../components/StudentUI/ChangeProjectStatus";
const StudentProjectDetails = () => {
    var _a;
    const { t } = useTranslation();
    const location = useLocation();
    const { proj } = location.state || {};
    const { id } = useParams();
    const projectId = parseInt(id);
    const [studentName, setStudentName] = useState("");
    const navigate = useNavigate();
    const handleChange = (value) => {
        if (value !== '') {
            setStudentName(value);
        }
    };
    const handleAddStudent = () => {
        console.log(studentName);
        console.log(proj.company_id);
        // Functionality to add student to project will be added here
    };
    return (_jsx(Container, { className: "student-main-container", children: _jsxs(Row, { className: "student-main-row", children: [_jsxs(Col, { xs: "12", lg: "7", children: [_jsxs("h4", { children: [t('projectNo'), " ", proj.project_number] }), _jsx("h6", { children: proj.project_name }), _jsxs("div", { style: { margin: "20px 0" }, children: [_jsxs("div", { style: { fontWeight: "bold" }, children: [t('projDesc'), " :"] }), _jsx("div", { children: proj.project_description })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('status') }), _jsx(Col, { children: t(proj.project_status) })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('company') }), _jsx(Col, { children: proj.company_name })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('startDate') }), _jsx(Col, { children: String(proj.start_date).split('T')[0] })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('dueDate') }), _jsx(Col, { children: String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0] })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('url') }), _jsx(Col, { children: proj.project_url ? proj.project_url : "no url added" })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('supervisor') }), _jsx(Col, { children: proj.teacher_name })] }), _jsxs(Row, { children: [_jsx(Col, { style: { fontWeight: "bold", color: "#5e5e5e" }, children: t('studInvolved') }), _jsx(Col, { style: { display: "flex", flexDirection: "column" }, children: proj.studentsInvolved.map((student, index) => (_jsx(Col, { children: student }, index))) })] }), _jsx(Button, { className: "student-view-button", onClick: () => navigate('/form', { state: { proj } }), children: t('modifyData') })] }), _jsxs(Col, { xs: "12", lg: "5", style: { marginTop: "15%" }, children: [_jsxs("div", { style: { fontWeight: "bold", marginBottom: "10px" }, children: [t('changeStatus'), ":"] }), _jsx(ChangeProjectStatus, { projectData: proj })] }), _jsx("hr", { className: "hr-style" }), _jsx("div", { style: { fontWeight: "bold" }, children: t('projNotes') }), _jsx(NotesListing, { projectId: projectId }), _jsx("hr", { className: "hr-style" }), _jsx("div", { style: { fontWeight: "bold" }, children: t('projDocs') }), _jsx(DocumentsListing, { projectId: projectId }), _jsx("hr", { className: "hr-style" }), _jsx("div", { style: { fontWeight: "bold" }, children: t('studInvolved') }), _jsxs(Row, { className: "notes-listing", children: [_jsxs(Col, { children: [_jsxs("div", { style: { fontWeight: "bold" }, children: [t('studInProj'), ":"] }), (_a = proj.studentsInvolved) === null || _a === void 0 ? void 0 : _a.map((student, index) => (_jsx("div", { children: student }, index)))] }), _jsxs(Col, { children: [_jsx(Form, { children: _jsx(Form.Control, { type: "text", placeholder: t('enterName'), style: { width: "300px", fontSize: "13px" }, onChange: (e) => handleChange(e.target.value), value: studentName }) }), _jsx(Button, { className: "student-view-button", type: 'button', onClick: () => handleAddStudent(), children: t('addStudent') })] })] })] }) }));
};
export default StudentProjectDetails;
