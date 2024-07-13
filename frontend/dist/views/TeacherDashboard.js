import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
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
    const { resources, signedInTeacher } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const stydyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);
    // teacher_id will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = (resources === null || resources === void 0 ? void 0 : resources.find((resource) => resource.study_year === stydyYear && resource.teacher_id === 1)) || null;
    return (_jsx(Container, { className: 'teacher-main-container', children: _jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { xs: 12, md: 12, lg: 11, children: [signedInTeacher ?
                        _jsxs("div", { children: [_jsxs("h4", { children: [signedInTeacher.first_name, " ", signedInTeacher.last_name] }), _jsx("div", { style: { fontSize: "small" }, children: signedInTeacher.email })] })
                        : "No teacher data", _jsxs("div", { className: 'item-group', children: [_jsxs("div", { className: 'second-heading', children: [t('resourcesCurr'), " ", stydyYear, " "] }), teacherCurrentResource ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('totRes'), " ", teacherCurrentResource.total_resources] }), _jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('usedRes'), " ", teacherCurrentResource.used_resources] })] })) : (_jsx("div", { style: { fontSize: "14px", paddingLeft: "5%" }, children: t('notResources') }))] }), _jsxs("div", { className: 'item-group', children: [_jsx(Button, { onClick: () => setShowPastResources(true), className: 'resources-button', children: t('resourcesPast') }), showPastResources ? _jsx(PastResources, { resources: resources, id: 1, showTable: showPastResources, handleClose: () => setShowPastResources(false) }) : null] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('addCompFavo') }), _jsx(FavoCompDropdown, { data: companies })] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('projectsCurr') }), _jsx(OngoingProjectsList, {})] }), _jsx("div", { className: 'item-group', children: _jsx("div", { className: 'second-heading', children: t('projectsPast') }) })] }) }) }));
};
export default TeacherDashboard;
