import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import PastResources from '../components/TeacherUI/PastResources';
import OngoingProjectsList from '../components/TeacherUI/OngoingProjectsList';
import PastProjectsList from '../components/TeacherUI/PastProjectsList';
import { useParams } from 'react-router-dom';
import ModifyResource from '../components/TeacherUI/ModifyResource';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const ModifyTeacher = () => {
    const { t } = useTranslation();
    const { resources, teachers } = useTeachersContext();
    const currentDate = new Date();
    const studyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);
    const [showAddResources, setShowAddResources] = useState(false);
    const { id } = useParams();
    const teacherId = parseInt(id);
    // teacher_id will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = (resources === null || resources === void 0 ? void 0 : resources.find((resource) => resource.study_year === studyYear && resource.teacher_id === teacherId)) || null;
    const teacherDetails = (teachers === null || teachers === void 0 ? void 0 : teachers.find((teacher) => teacher.teacher_id === teacherId)) || null;
    return (_jsx(Container, { className: 'teacher-main-container', children: _jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { xs: 12, md: 12, lg: 11, children: [teacherDetails ?
                        _jsxs("div", { children: [_jsx("h4", { children: teacherDetails.teacher_name }), _jsx("div", { style: { fontSize: "small" }, children: teacherDetails.email })] })
                        : "No teacher data", _jsxs("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between" }, children: [_jsxs("div", { className: 'item-group', children: [_jsxs("div", { className: 'second-heading', children: [t('resourcesCurr'), " ", studyYear, " "] }), teacherCurrentResource ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('totRes'), " ", teacherCurrentResource.total_resources] }), _jsxs("div", { style: { fontSize: "medium", paddingLeft: "5%" }, children: [t('usedRes'), " ", teacherCurrentResource.used_resources] })] })) : (_jsx("div", { style: { fontSize: "14px", paddingLeft: "5%" }, children: t('notResources') }))] }), _jsx(Button, { onClick: () => setShowAddResources(true), className: 'resources-button', children: t('modifyRes') })] }), _jsx("div", { children: showAddResources ? _jsx(ModifyResource, { teacherId: teacherId, handleClose: () => setShowAddResources(false) }) : null }), _jsxs("div", { className: 'item-group', children: [_jsx(Button, { onClick: () => setShowPastResources(true), className: 'resources-button', style: { marginTop: "5%" }, children: t('resourcesPast') }), showPastResources ? _jsx(PastResources, { study_year: studyYear, resources: resources, id: teacherId, showTable: showPastResources, handleClose: () => setShowPastResources(false) }) : null] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('projectsCurr') }), _jsx(OngoingProjectsList, { teacherId: teacherId })] }), _jsxs("div", { className: 'item-group', children: [_jsx("div", { className: 'second-heading', children: t('projectsPast') }), _jsx(PastProjectsList, { teacherId: teacherId })] })] }) }) }));
};
export default ModifyTeacher;
