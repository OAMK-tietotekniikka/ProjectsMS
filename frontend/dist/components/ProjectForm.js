import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
const ProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        project_name: '',
        companyName: '',
        startDate: '',
        dueDate: '',
        project_description: ''
    });
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        const { project_name, companyName, startDate, project_description } = formData;
        const isValid = project_name !== '' && companyName !== '' && startDate !== '' && project_description !== '';
        setValidated(isValid);
    }, [formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (_jsx(Container, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "project_name", className: "form-item", children: [_jsx(Form.Label, { children: t('projName') }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "companyName", className: "form-item", children: [_jsx(Form.Label, { children: t('company') }), _jsx(Form.Control, { type: "text", name: "companyName", value: formData.companyName, onChange: handleChange, required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "startDate", className: "form-item", children: [_jsx(Form.Label, { children: t('startDate') }), _jsx(Form.Control, { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange, required: true })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "dueDate", className: "form-item", children: [_jsx(Form.Label, { children: t('dueDate') }), _jsx(Form.Control, { type: "date", name: "dueDate", value: formData.dueDate, onChange: handleChange })] }) })] }), _jsxs(Form.Group, { controlId: "project_description", className: "form-item", style: { paddingTop: '2%' }, children: [_jsx(Form.Label, { children: t('projDesc') }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_description", value: formData.project_description, onChange: handleChange, placeholder: t('projDescPlaceholder'), required: true })] }), _jsx("div", { style: { paddingTop: '2%' }, children: _jsx("p", { children: t('obligatory') }) }), _jsx(Button, { variant: "primary", type: "submit", className: "submit-button", disabled: !validated, children: t('createPrjButton') })] }) }));
};
export default ProjectForm;
