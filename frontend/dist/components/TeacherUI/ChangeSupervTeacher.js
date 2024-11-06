import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import { getStudyYear } from '../GetStudyYear';
import 'bootstrap/dist/css/bootstrap.min.css';
;
const ChangeSupervTeacher = ({ setSelectedTeacher, selectedTeacher }) => {
    const { t } = useTranslation();
    const { teachers, resources } = useTeachersContext();
    const currStudyYear = getStudyYear(new Date());
    const teachersWithResources = teachers === null || teachers === void 0 ? void 0 : teachers.map((teacher) => {
        const teacherResource = resources === null || resources === void 0 ? void 0 : resources.find((resource) => resource.teacher_id === teacher.teacher_id && resource.study_year === currStudyYear);
        return Object.assign(Object.assign({}, teacher), { total_resources: (teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.total_resources) || 0, used_resources: (teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.used_resources) || 0, resource_id: teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.resource_id });
    });
    const handleSelection = (e, teacher) => {
        e.preventDefault();
        setSelectedTeacher(teacher);
    };
    const handleNoSupervisorSelection = (e) => {
        e.preventDefault();
        setSelectedTeacher(null);
    };
    return (_jsx(Container, { style: { paddingLeft: "5px", margin: "0% 0% 2% 2%", backgroundColor: "#f0f0f0", width: "98%" }, children: _jsxs(Row, { className: 'dropdown-row', children: [_jsx(Col, { xs: "12", lg: "6", children: _jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: t('resourcesToggle') }), _jsxs(Dropdown.Menu, { children: [_jsx(Dropdown.Item, { onClick: handleNoSupervisorSelection, className: "dropdown-item", href: "#/no-supervisor", children: _jsx("div", { className: 'dropdown-item-row', children: _jsx(Col, { xs: "12", children: t('noSupervisor') }) }) }), teachersWithResources === null || teachersWithResources === void 0 ? void 0 : teachersWithResources.map((teacher, index) => (_jsx(Dropdown.Item, { onClick: (e) => handleSelection(e, teacher), className: "dropdown-item", href: "#/action-${index}", children: _jsxs("div", { className: 'dropdown-item-row', children: [_jsx(Col, { xs: "6", children: teacher.teacher_name }), _jsxs(Col, { xs: "6", children: [teacher.total_resources, " / ", teacher.used_resources] })] }) }, index)))] })] }) }), _jsx(Col, { xs: "12", lg: "6", style: { marginTop: "20px", textAlign: "end" }, children: _jsxs("div", { children: [_jsxs("div", { children: [t('newSupervisingTeacher'), ":"] }), selectedTeacher ? (_jsx("div", { style: { fontSize: "small", fontWeight: "bold", paddingBottom: "10px" }, children: selectedTeacher.teacher_name })) : (_jsx("div", { children: t('notSelected') }))] }) })] }) }));
};
export default ChangeSupervTeacher;
