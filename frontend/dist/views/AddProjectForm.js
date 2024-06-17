import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
const AddProjectForm = ({ onSubmit }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        project_name: '',
        companyName: '',
        startDate: '',
        dueDate: '',
        project_description: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (_jsx(Container, { children: _jsx(Row, { className: "justify-content-md-center", children: _jsx(Col, { md: 8, children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "project_name", children: [_jsx(Form.Label, { children: "Project Name" }), _jsx(Form.Control, { type: "text", name: "project_name", value: formData.project_name, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "companyName", children: [_jsx(Form.Label, { children: "Company Name" }), _jsx(Form.Control, { type: "text", name: "companyName", value: formData.companyName, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "startDate", children: [_jsx(Form.Label, { children: "Start Date" }), _jsx(Form.Control, { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "dueDate", children: [_jsx(Form.Label, { children: "Due Date" }), _jsx(Form.Control, { type: "date", name: "dueDate", value: formData.dueDate, onChange: handleChange, required: true })] }), _jsxs(Form.Group, { controlId: "project_description", children: [_jsx(Form.Label, { children: "Project Description" }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "project_description", value: formData.project_description, onChange: handleChange, required: true })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" })] }) }) }) }));
};
export default AddProjectForm;
