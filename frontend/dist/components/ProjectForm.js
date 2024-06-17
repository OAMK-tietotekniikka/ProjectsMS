import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
const ProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [companyName, setCompanyName] = useState('');
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
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        const { project_name, start_date, project_desc } = formData;
        const isValid = project_name !== '' && companyName !== '' && start_date !== null && project_desc !== '';
        setValidated(isValid);
    }, [formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value ? new Date(value) : null }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // call for select teacher function to get the teacher id
        //const teacherId = selectTeacher(companyName, formData.start_date);
        // add teacherId to the formData
        onSubmit(formData, companyName);
    };
    return (_jsx(Container, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "project_name", className: "form-item", children: [_jsx(Form.Label, { children: t('projName') }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "companyName", className: "form-item", children: [_jsx(Form.Label, { children: t('company') }), _jsx(Form.Control, { type: "text", name: "companyName", value: companyName, onChange: (e) => setCompanyName(e.target.value), required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "start_date", className: "form-item", children: [_jsx(Form.Label, { children: t('startDate') }), _jsx(Form.Control, { type: "date", name: "start_date", value: formData.start_date ? formData.start_date.toISOString().split('T')[0] : '', onChange: handleDateChange, required: true })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "end_date", className: "form-item", children: [_jsx(Form.Label, { children: t('dueDate') }), _jsx(Form.Control, { type: "date", name: "end_date", value: formData.end_date ? formData.end_date.toISOString().split('T')[0] : '', onChange: handleDateChange })] }) })] }), _jsxs(Form.Group, { controlId: "project_desc", className: "form-item", style: { paddingTop: '2%' }, children: [_jsx(Form.Label, { children: t('projDesc') }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_desc", value: formData.project_desc, onChange: handleChange, placeholder: t('projDescPlaceholder'), required: true })] }), _jsx("div", { style: { paddingTop: '2%' }, children: _jsx("p", { children: t('obligatory') }) }), _jsx(Button, { variant: "primary", type: "submit", className: "submit-button", disabled: !validated, children: t('createPrjButton') })] }) }));
};
export default ProjectForm;
