import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useUserContext } from '../../contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
const ChangeProjectStatus = ({ projectData }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { modifyProject, fetchProjects } = useProjectsContext();
    const [projectStatus, setProjectStatus] = useState((projectData === null || projectData === void 0 ? void 0 : projectData.project_status) || '');
    const [initialStatus, setInitialStatus] = useState((projectData === null || projectData === void 0 ? void 0 : projectData.project_status) || '');
    const currentDate = new Date();
    const { user } = useUserContext();
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    const handleStatusChange = (status) => {
        setProjectStatus(status);
    };
    const handleSave = () => {
        const updatedProject = {
            project_name: projectData === null || projectData === void 0 ? void 0 : projectData.project_name,
            project_desc: projectData === null || projectData === void 0 ? void 0 : projectData.project_desc,
            teacher_id: projectData === null || projectData === void 0 ? void 0 : projectData.teacher_id,
            company_id: projectData === null || projectData === void 0 ? void 0 : projectData.company_id,
            project_status: projectStatus,
            project_url: projectData === null || projectData === void 0 ? void 0 : projectData.project_url,
            start_date: projectData === null || projectData === void 0 ? void 0 : projectData.start_date,
            end_date: projectStatus === "completed" ? currentDate : projectData === null || projectData === void 0 ? void 0 : projectData.end_date,
        };
        modifyProject(updatedProject, projectData.project_id);
        user === "teacher" ? navigate('/teacher') : navigate('/student');
    };
    const isStatusChanged = projectStatus !== initialStatus;
    return (_jsx(Container, { children: _jsx(Row, { children: _jsxs(Col, { className: 'radio-column', children: [_jsx(Form, { children: _jsxs("div", { children: [_jsx(Form.Check, { className: 'form-check', type: 'radio', label: _jsxs("span", { children: [_jsx("strong", { children: t('pending') }), " ", _jsxs("span", { className: 'radio-span', children: [" (", t('pendingRadio'), ") "] })] }), checked: projectStatus === 'pending', onChange: () => handleStatusChange('pending') }), _jsx(Form.Check, { className: 'form-check', type: 'radio', label: _jsxs("span", { children: [_jsx("strong", { children: t('ongoing') }), " ", _jsxs("span", { className: 'radio-span', children: [" (", t('ongoingRadio'), ")"] })] }), checked: projectStatus === 'ongoing', onChange: () => handleStatusChange('ongoing') }), user === "teacher" &&
                                    _jsx(Form.Check, { className: 'form-check', type: 'radio', label: _jsxs("span", { children: [_jsx("strong", { children: t('completed') }), " ", _jsxs("span", { className: 'radio-span', children: [" (", t('completedRadio'), ")"] })] }), checked: projectStatus === 'completed', onChange: () => handleStatusChange('completed') })] }) }), _jsx(Button, { className: "student-view-button", type: 'button', style: { width: "100px", marginTop: "5px", alignSelf: "end" }, onClick: () => handleSave(), disabled: !isStatusChanged, children: t('save') })] }) }) }));
};
export default ChangeProjectStatus;
