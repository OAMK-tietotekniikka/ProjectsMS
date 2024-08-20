import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import { getStudyYear } from '../GetStudyYear';
import 'bootstrap/dist/css/bootstrap.min.css';
const ChangeSupervTeacher = () => {
    const { t } = useTranslation();
    const { teachers, resources, updateTeacherResource } = useTeachersContext();
    const currStudyYear = getStudyYear(new Date());
    console.log('currStudyYear', currStudyYear);
    const teachersWithResources = teachers === null || teachers === void 0 ? void 0 : teachers.map((teacher) => {
        const teacherResource = resources === null || resources === void 0 ? void 0 : resources.find((resource) => resource.teacher_id === teacher.teacher_id && resource.study_year === currStudyYear);
        return Object.assign(Object.assign({}, teacher), { total_resources: (teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.total_resources) || 0, used_resources: (teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.used_resources) || 0, resource_id: teacherResource === null || teacherResource === void 0 ? void 0 : teacherResource.resource_id });
    });
    const handleSelection = (e, item) => {
        console.log('item', item);
    };
    return (_jsx(Container, { style: { paddingLeft: "0px", marginTop: "2%" }, children: _jsx(Row, { className: 'dropdown-row', children: _jsx(Col, { children: _jsxs(Dropdown, { className: "change-teacher-dropdown", children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle' }), _jsx(Dropdown.Menu, { children: teachersWithResources === null || teachersWithResources === void 0 ? void 0 : teachersWithResources.map((teacher, index) => (_jsx(Dropdown.Item, { onClick: (e) => handleSelection(e, teacher), className: "dropdown-item", href: "#/action-${index}", children: _jsxs("div", { className: '', children: [_jsxs(Col, { xs: "6", children: [teacher.first_name, " ", teacher.last_name] }), _jsxs(Col, { xs: "6", children: [teacher.total_resources, " / ", teacher.used_resources] })] }) }, index))) })] }) }) }) }));
};
export default ChangeSupervTeacher;
