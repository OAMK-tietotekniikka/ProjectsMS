var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useUserContext } from '../../contexts/userContext';
import { getCompanyId } from '../TeacherUI/GetCompanyId';
import { selectTeacher } from '../TeacherUI/SelectTeacher';
import { useLocation, useNavigate } from 'react-router-dom';
import ChangeSupervTeacher from '../TeacherUI/ChangeSupervTeacher';
import 'bootstrap/dist/css/bootstrap.min.css';
const ProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { companies, addCompany } = useCompaniesContext();
    const { resources, updateTeacherResource, teachers } = useTeachersContext();
    const { user } = useUserContext();
    const { modifyProject } = useProjectsContext();
    const { proj } = location.state || {};
    const [companyName, setCompanyName] = useState((proj === null || proj === void 0 ? void 0 : proj.company_name) || '');
    const [classCode, setClassCode] = useState((proj === null || proj === void 0 ? void 0 : proj.class_code) || '');
    const [validated, setValidated] = useState(false);
    const [showTeacherChange, setShowTeacherChange] = useState(false);
    const [formData, setFormData] = useState({
        project_name: (proj === null || proj === void 0 ? void 0 : proj.project_name) || '',
        project_desc: (proj === null || proj === void 0 ? void 0 : proj.project_desc) || '',
        teacher_id: (proj === null || proj === void 0 ? void 0 : proj.teacher_id) || 0,
        company_id: 0,
        project_status: 'pending',
        project_url: 'no url',
        start_date: (proj === null || proj === void 0 ? void 0 : proj.start_date) ? new Date(proj.start_date) : null,
        end_date: (proj === null || proj === void 0 ? void 0 : proj.end_date) ? new Date(proj.end_date) : null,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value ? new Date(value) : null }));
    };
    useEffect(() => {
        const { project_name, start_date, project_desc } = formData;
        const isValid = project_name !== '' && companyName !== '' && start_date !== null && project_desc !== '';
        setValidated(isValid);
    }, [formData]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            const company_id = yield getCompanyId(companyName, companies, addCompany);
            const resource = yield selectTeacher(companyName, formData.start_date, resources);
            const teacher_id = resource.teacher_id;
            if (proj) {
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: proj.teacher_id,
                    company_id: company_id,
                    project_status: proj.project_status,
                    project_url: proj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, proj.project_id);
                user === "teacher" ? navigate('/teacher') : navigate('/student');
            }
            else {
                updateTeacherResource(resource.resource_id, Object.assign(Object.assign({}, resource), { used_resources: resource.used_resources + 1 }));
                onSubmit(formData, company_id, teacher_id, companyName);
            }
        }
        catch (error) {
            console.error("Failed to submit form:", error);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx("h4", { className: 'main-heading', children: proj ? t('modifyData') : t('createProj') }), _jsx("div", { className: 'instruction ', children: _jsx("p", { children: proj ? "" : t('projInstruction') }) }), _jsxs(Container, { children: [user === "teacher" &&
                        _jsxs(_Fragment, { children: [_jsx("h5", { style: { marginBottom: "20px" }, children: formData.project_name }), _jsxs("div", { children: [_jsx("h6", { children: proj.name }), _jsx("div", { style: { fontSize: "small", marginBottom: "20px" }, children: proj.student_email })] }), _jsxs("div", { className: 'modify-project-row', children: [_jsxs(Row, { children: [_jsxs(Col, { xs: "5", style: { fontWeight: "bold" }, children: [t('supervisor'), ":"] }), _jsx(Col, { xs: "5", style: { padding: "0%" }, children: proj.teacher_name }), _jsx(Col, { xs: "2", style: { padding: "0%" }, children: _jsx(Button, { onClick: () => setShowTeacherChange(true), children: t('change') }) })] }), showTeacherChange &&
                                            _jsx(Row, { children: _jsx(ChangeSupervTeacher, {}) })] })] }), user === "teacher" &&
                        _jsxs(Form.Group, { controlId: "classCode", className: "form-item", children: [_jsxs(Form.Label, { children: [t('studyGroup'), " *"] }), _jsx(Form.Control, { type: "text", name: "class_code", value: (proj.class_code).toUpperCase(), onChange: (e) => setClassCode(e.target.value), required: true })] }), _jsxs(Form, { onSubmit: handleSubmit, children: [user === "student" &&
                                _jsxs(Form.Group, { controlId: "project_name", className: "form-item", children: [_jsxs(Form.Label, { children: [t('projName'), " *"] }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), user === "student" &&
                                _jsxs(Form.Group, { controlId: "companyName", className: "form-item", children: [_jsxs(Form.Label, { children: [t('companyName'), " *"] }), _jsx(Form.Control, { type: "text", name: "companyName", value: companyName, onChange: (e) => setCompanyName(e.target.value), required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "start_date", className: "form-item", children: [_jsxs(Form.Label, { children: [t('startDate'), " *"] }), _jsx(Form.Control, { type: "date", name: "start_date", value: formData.start_date ? formData.start_date.toISOString().split('T')[0] : '', onChange: handleDateChange, required: true })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "end_date", className: "form-item", children: [_jsx(Form.Label, { children: t('dueDate') }), _jsx(Form.Control, { type: "date", name: "end_date", value: formData.end_date ? formData.end_date.toISOString().split('T')[0] : '', onChange: handleDateChange })] }) })] }), user === "student" &&
                                _jsxs(Form.Group, { controlId: "project_desc", className: "form-item", style: { paddingTop: '2%' }, children: [_jsxs(Form.Label, { children: [t('projDesc'), " *"] }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_desc", value: formData.project_desc, onChange: handleChange, placeholder: t('projDescPlaceholder'), required: true })] }), _jsx("div", { style: { paddingTop: '2%' }, children: _jsx("p", { children: t('obligatory') }) }), _jsx(Button, { variant: "primary", type: "submit", className: "submit-button", disabled: !validated, children: proj ? t('saveModify') : t('createPrjButton') })] })] })] }));
};
export default ProjectForm;
