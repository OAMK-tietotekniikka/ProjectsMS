import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import PastResources from '../components/TeacherUI/PastResources';
import FavoCompDropdown from '../components/TeacherUI/FavoCompDropdown';
import OngoingProjectsList from '../components/TeacherUI/OngoingProjectsList';
import PastProjectsList from '../components/TeacherUI/PastProjectsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const TeacherDashboard = () => {
    const { resources, signedInTeacher, teachers } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const studyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);
    // teacher_id will be replaced with the actual values when the teacher login is implemented
    const teacherId = (signedInTeacher === null || signedInTeacher === void 0 ? void 0 : signedInTeacher.teacher_id) || null;
    const teacherCurrentResource = (resources === null || resources === void 0 ? void 0 : resources.find((resource) => resource.study_year === studyYear && resource.teacher_id === teacherId)) || null;
    const teacherDetails = (teachers === null || teachers === void 0 ? void 0 : teachers.find((teacher) => teacher.teacher_id === teacherId)) || null;
    return (_jsx(Container, { className: 'teacher-main-container', children: _jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { xs: 12, md: 12, lg: 11, children: [teacherDetails ?
                        _jsxs("div", { children: [_jsxs("h4", { children: [teacherDetails.first_name, " ", teacherDetails.last_name] }), _jsx("div", { style: { fontSize: "small" }, children: teacherDetails.email })] })
                        : "No teacher data", _jsxs("div", { className: 'item-group', children: [_jsxs("div", { className: 'second-heading', children: [t('resourcesCurr'), " ", studyYear, " "] }), teacherCurrentResource ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('totRes'), " ", teacherCurrentResource.total_resources] }), _jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('usedRes'), " ", teacherCurrentResource.used_resources] })] })) : (_jsx("div", { style: { fontSize: "14px", paddingLeft: "5%" }, children: t('notResources') }))] }), _jsxs("div", { className: 'item-group', children: [_jsx(Button, { onClick: () => setShowPastResources(true), className: 'resources-button', children: t('resourcesPast') }), showPastResources ? _jsx(PastResources, { study_year: studyYear, resources: resources, id: teacherId, showTable: showPastResources, handleClose: () => setShowPastResources(false) }) : null] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('addCompFavo') }), _jsx(FavoCompDropdown, { data: companies })] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('projectsCurr') }), _jsx(OngoingProjectsList, { teacherId: teacherId })] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('projectsPast') }), _jsx(PastProjectsList, { teacherId: teacherId })] })] }) }) }));
};
export default TeacherDashboard;
