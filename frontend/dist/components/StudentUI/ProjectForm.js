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
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useUserContext } from '../../contexts/userContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import { getCompanyId } from '../TeacherUI/GetCompanyId';
import { selectTeacher } from '../TeacherUI/SelectTeacher';
import { useLocation, useNavigate } from 'react-router-dom';
import ChangeSupervTeacher from '../TeacherUI/ChangeSupervTeacher';
import { noResourcesEmailToTeachers, sendEmail } from '../SendEmail';
import { getStudyYear } from '../GetStudyYear';
import 'bootstrap/dist/css/bootstrap.min.css';
const ProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { companies, addCompany } = useCompaniesContext();
    const { resources, updateTeacherResource, teachers } = useTeachersContext();
    const { modifyStudent, students, signedInStudent } = useStudentsContext();
    const { user } = useUserContext();
    const { modifyProject } = useProjectsContext();
    const { proj } = location.state || {};
    const currStudyYear = getStudyYear(new Date());
    const [companyName, setCompanyName] = useState((proj === null || proj === void 0 ? void 0 : proj.company_name) || '');
    const [classCode, setClassCode] = useState((proj === null || proj === void 0 ? void 0 : proj.class_code) || '');
    const [selectedTeacher, setSelectedTeacher] = useState({});
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
    const handleClassChange = (e) => {
        const { value } = e.target;
        setClassCode(value);
    };
    useEffect(() => {
        const { project_name, start_date, project_desc } = formData;
        const isValid = project_name !== '' && companyName !== '' && start_date !== null && project_desc !== '';
        setValidated(isValid);
    }, [formData]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (selectedTeacher !== null && selectedTeacher.teacher_id && proj) {
            const student = (students === null || students === void 0 ? void 0 : students.find((student) => student.email === proj.student_email)) || null;
            const selectedTeacherResource = resources.find(res => res.teacher_id === selectedTeacher.teacher_id && res.study_year === currStudyYear);
            const resourceAdded = {
                teacher_id: selectedTeacher.teacher_id,
                total_resources: selectedTeacherResource.total_resources,
                used_resources: selectedTeacherResource.used_resources + 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(selectedTeacherResource.resource_id, resourceAdded);
            const currentTeacherResource = resources.find(res => res.teacher_id === proj.teacher_id && res.study_year === currStudyYear);
            const resourceRemoved = {
                teacher_id: proj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);
            try {
                const studentName = `${student.first_name} ${student.last_name}`;
                const emailResponse = yield sendEmail(selectedTeacher.email, studentName, formData.project_name, proj.company_name, formData.start_date.toISOString().split('T')[0]);
                if (emailResponse) {
                    console.log('Email sent successfully');
                }
                else {
                    alert(t('emailNotSent'));
                }
            }
            catch (error) {
                console.error('Failed to send email:', error);
            }
        }
        if (selectedTeacher === null && proj) {
            console.log(proj);
            console.log(selectedTeacher);
            const currentTeacherResource = resources.find(res => res.teacher_id === proj.teacher_id && res.study_year === currStudyYear);
            console.log(currentTeacherResource);
            const resourceRemoved = {
                teacher_id: proj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currentTeacherResource.study_year,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);
            console.log('Resource removed from current teacher');
        }
        if (proj && classCode !== proj.class_code && user === "teacher") {
            const student = (students === null || students === void 0 ? void 0 : students.find((student) => student.email === proj.student_email)) || null;
            try {
                const modifiedStudent = {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    class_code: classCode,
                    password: student.password,
                };
                modifyStudent(modifiedStudent, student.student_id);
            }
            catch (error) {
                console.error("Failed to modify student:", error);
            }
        }
        try {
            const teacherEmails = teachers.map(teacher => teacher.email);
            let teacherId = 0;
            const companyId = yield getCompanyId(companyName, companies, addCompany);
            const resource = yield selectTeacher(companyName, formData.start_date, resources);
            resource === null ? teacherId = null : teacherId = resource.teacher_id;
            if (resource === null) {
                try {
                    const emailResponse = yield noResourcesEmailToTeachers(teacherEmails, `${signedInStudent === null || signedInStudent === void 0 ? void 0 : signedInStudent.first_name} ${signedInStudent === null || signedInStudent === void 0 ? void 0 : signedInStudent.last_name}`, signedInStudent.class_code, formData.start_date.toISOString().split('T')[0]);
                    if (emailResponse) {
                        console.log('Email sent successfully');
                    }
                    else {
                        console.log('Email not sent');
                    }
                }
                catch (error) {
                    console.error("Failed to send email:", error);
                }
            }
            if (user === "student" && proj) {
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: proj.teacher_id,
                    company_id: companyId,
                    project_status: proj.project_status,
                    project_url: proj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, proj.project_id);
                navigate('/student');
            }
            else if (user === "teacher" && proj) {
                const teacherId = selectedTeacher === null ? null : (selectedTeacher.teacher_id ? selectedTeacher.teacher_id : formData.teacher_id);
                console.log(`Teacher_id from project form after teacher modification: ${teacherId}`);
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: teacherId,
                    company_id: proj.company_id,
                    project_status: proj.project_status,
                    project_url: proj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, proj.project_id);
                navigate('/teacher');
            }
            else {
                if (resource !== null) {
                    updateTeacherResource(resource.resource_id, Object.assign(Object.assign({}, resource), { used_resources: resource.used_resources + 1 }));
                }
                onSubmit(formData, companyId, teacherId, companyName);
            }
        }
        catch (error) {
            console.error("Failed to submit form:", error);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx("h4", { className: 'main-heading', children: proj ? t('modifyData') : t('createProj') }), _jsx("div", { className: 'instruction ', children: _jsx("p", { children: proj ? "" : t('projInstruction') }) }), _jsxs(Container, { children: [user === "teacher" &&
                        _jsxs(_Fragment, { children: [_jsx("h5", { style: { marginBottom: "20px" }, children: formData.project_name }), _jsxs("div", { children: [_jsx("h6", { children: proj.name }), _jsx("div", { style: { fontSize: "small", marginBottom: "20px" }, children: proj.student_email })] }), _jsxs("div", { children: [_jsxs("h6", { children: [t('projDesc'), ":"] }), _jsx("div", { style: { fontSize: "small", marginBottom: "20px" }, children: proj.project_desc })] }), _jsxs("div", { className: 'modify-project-row', children: [_jsxs(Row, { children: [_jsx(Col, { xs: "5", style: { fontWeight: "bold" }, children: _jsx("h6", { children: t('supervisor') }) }), _jsx(Col, { xs: "5", style: { padding: "0%" }, children: proj.teacher_name }), _jsx(Col, { xs: "2", style: { padding: "0%" }, children: _jsx(Button, { className: 'modify-project-button', onClick: () => setShowTeacherChange(true), children: t('change') }) })] }), showTeacherChange &&
                                            _jsx(Row, { children: _jsx(ChangeSupervTeacher, { setSelectedTeacher: (teacher) => setSelectedTeacher(teacher), selectedTeacher: selectedTeacher }) })] })] }), user === "teacher" &&
                        _jsxs(Form.Group, { controlId: "classCode", className: "form-item", children: [_jsxs(Form.Label, { children: [t('studyGroup'), " *"] }), _jsx(Form.Control, { type: "text", name: "class_code", value: classCode.toUpperCase(), onChange: handleClassChange, required: true })] }), _jsxs(Form, { onSubmit: handleSubmit, children: [user === "student" &&
                                _jsxs(Form.Group, { controlId: "project_name", className: "form-item", children: [_jsxs(Form.Label, { children: [t('projName'), " *"] }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), _jsx("div", { children: t('dropdownSelectCompany') }), _jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: t('select') }), _jsx(Dropdown.Menu, { children: (companies === null || companies === void 0 ? void 0 : companies.map((item, index) => (_jsx(Dropdown.Item, { onClick: () => setCompanyName(item.company_name), className: `dropdown-item-${index}`, href: "#/action-${index}", children: item.company_name }, index)))) || _jsx(Dropdown.Item, { children: t('noComp') }) })] }), user === "student" &&
                                _jsxs(Form.Group, { controlId: "companyName", className: "form-item", children: [_jsxs(Form.Label, { children: [t('companyName'), " *"] }), _jsx(Form.Control, { type: "text", name: "companyName", value: companyName, onChange: (e) => setCompanyName(e.target.value), required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "start_date", className: "form-item", children: [_jsxs(Form.Label, { children: [t('startDate'), " *"] }), _jsx(Form.Control, { type: "date", name: "start_date", value: formData.start_date ? formData.start_date.toISOString().split('T')[0] : '', onChange: handleDateChange, required: true })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "end_date", className: "form-item", children: [_jsx(Form.Label, { children: t('dueDate') }), _jsx(Form.Control, { type: "date", name: "end_date", value: formData.end_date ? formData.end_date.toISOString().split('T')[0] : '', onChange: handleDateChange })] }) })] }), user === "student" &&
                                _jsxs(Form.Group, { controlId: "project_desc", className: "form-item", style: { paddingTop: '2%' }, children: [_jsxs(Form.Label, { children: [t('projDesc'), " *"] }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_desc", value: formData.project_desc, onChange: handleChange, placeholder: t('projDescPlaceholder'), required: true })] }), _jsx("div", { style: { paddingTop: '2%' }, children: _jsx("p", { children: t('obligatory') }) }), _jsx(Button, { variant: "primary", type: "submit", className: "submit-button", disabled: !validated, children: proj ? t('saveModify') : t('createPrjButton') })] })] })] }));
};
export default ProjectForm;
