import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import PastResources from '../components/PastResources';
import FavoCompDropdown from '../components/FavoCompDropdown';
import OngoingProjectsList from '../components/OngoingProjectsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const TeacherDashboard = () => {
    const { resources } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const stydyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);
    // teacher_id and teacher name below will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = resources.find((resource) => resource.study_year === stydyYear && resource.teacher_id === 1);
    return (_jsx(Container, Object.assign({ className: 'teacher-main-container' }, { children: _jsx(Row, Object.assign({ style: { width: "100%" } }, { children: _jsxs(Col, Object.assign({ xs: 12, md: 10, lg: 11 }, { children: [_jsxs("div", { children: [_jsx("h4", { children: "Teacher Name" }), _jsx("div", Object.assign({ style: { fontSize: "small" } }, { children: "teacher@email" }))] }), _jsxs("div", Object.assign({ className: 'item-group' }, { children: [_jsxs("div", Object.assign({ className: 'second-heading' }, { children: [t('resourcesCurr'), " ", stydyYear, " "] })), teacherCurrentResource ? (_jsxs(_Fragment, { children: [_jsxs("div", Object.assign({ style: { fontSize: "medium", paddingLeft: "5%" } }, { children: [t('totRes'), " ", teacherCurrentResource.total_resources] })), _jsxs("div", Object.assign({ style: { fontSize: "medium", paddingLeft: "5%" } }, { children: [t('usedRes'), " ", teacherCurrentResource.used_resources] }))] })) : (_jsx("div", Object.assign({ style: { fontSize: "14px", paddingLeft: "5%" } }, { children: t('notResources') })))] })), _jsxs("div", Object.assign({ className: 'item-group' }, { children: [_jsx(Button, Object.assign({ onClick: () => setShowPastResources(true), className: 'resources-button' }, { children: t('resourcesPast') })), showPastResources ? _jsx(PastResources, { resources: resources, id: 1, showTable: showPastResources, handleClose: () => setShowPastResources(false) }) : null] })), _jsxs("div", Object.assign({ className: 'item-group' }, { children: [_jsx("div", Object.assign({ className: 'second-heading' }, { children: t('addCompFavo') })), _jsx(FavoCompDropdown, { data: companies })] })), _jsxs("div", Object.assign({ className: 'item-group' }, { children: [_jsx("div", Object.assign({ className: 'second-heading' }, { children: t('projectsCurr') })), _jsx(OngoingProjectsList, {})] })), _jsx("div", Object.assign({ className: 'item-group' }, { children: _jsx("div", Object.assign({ className: 'second-heading' }, { children: t('projectsPast') })) }))] })) })) })));
};
export default TeacherDashboard;
