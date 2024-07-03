var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useTeachersContext } from '../contexts/teachersContext';
import { getCompanyId } from './GetCompanyId';
import { selectTeacher } from './SelectTeacher';
const ProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const { companies, addCompany } = useCompaniesContext();
    const { resources, updateTeacherResource } = useTeachersContext();
    const [companyName, setCompanyName] = useState('');
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        project_name: '',
        project_desc: '',
        teacher_id: 0,
        company_id: 0,
        project_status: 'pending',
        project_url: 'no url',
        start_date: null,
        end_date: null,
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
            updateTeacherResource(resource.resource_id, Object.assign(Object.assign({}, resource), { used_resources: resource.used_resources + 1 }));
            onSubmit(formData, company_id, teacher_id, companyName);
        }
        catch (error) {
            console.error("Failed to submit form:", error);
        }
    });
    return (_jsx(Container, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "project_name", className: "form-item", children: [_jsx(Form.Label, { children: t('projName') }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "companyName", className: "form-item", children: [_jsx(Form.Label, { children: t('company') }), _jsx(Form.Control, { type: "text", name: "companyName", value: companyName, onChange: (e) => setCompanyName(e.target.value), required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "start_date", className: "form-item", children: [_jsx(Form.Label, { children: t('startDate') }), _jsx(Form.Control, { type: "date", name: "start_date", value: formData.start_date ? formData.start_date.toISOString().split('T')[0] : '', onChange: handleDateChange, required: true })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "end_date", className: "form-item", children: [_jsx(Form.Label, { children: t('dueDate') }), _jsx(Form.Control, { type: "date", name: "end_date", value: formData.end_date ? formData.end_date.toISOString().split('T')[0] : '', onChange: handleDateChange })] }) })] }), _jsxs(Form.Group, { controlId: "project_desc", className: "form-item", style: { paddingTop: '2%' }, children: [_jsx(Form.Label, { children: t('projDesc') }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_desc", value: formData.project_desc, onChange: handleChange, placeholder: t('projDescPlaceholder'), required: true })] }), _jsx("div", { style: { paddingTop: '2%' }, children: _jsx("p", { children: t('obligatory') }) }), _jsx(Button, { variant: "primary", type: "submit", className: "submit-button", disabled: !validated, children: t('createPrjButton') })] }) }));
};
export default ProjectForm;
