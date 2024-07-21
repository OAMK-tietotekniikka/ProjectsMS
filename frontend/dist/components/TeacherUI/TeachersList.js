import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import SelectionDropdown from './SelectionDropdown';
import { useNavigate } from 'react-router-dom';
const TeachersList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { teachers, resources } = useTeachersContext();
    const [selectedData, setSelectedData] = useState([]);
    const selectionOptions = ['selectAll', 'selectByYear', 'selectByName'];
    const teachersWithResources = resources === null || resources === void 0 ? void 0 : resources.map((resource) => {
        var _a, _b;
        const teach = teachers === null || teachers === void 0 ? void 0 : teachers.find(teacher => teacher.teacher_id === resource.teacher_id);
        const teacherName = teach ? `${(_a = teach.first_name) !== null && _a !== void 0 ? _a : ''} ${(_b = teach.last_name) !== null && _b !== void 0 ? _b : ''}`.trim() : 'Unknown';
        return Object.assign(Object.assign({}, resource), { name: teacherName, email: (teach === null || teach === void 0 ? void 0 : teach.email) || 'Unknown Email' });
    });
    teachersWithResources === null || teachersWithResources === void 0 ? void 0 : teachersWithResources.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
        return yearB - yearA;
    });
    const dataToDisplay = (selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0 ? selectedData : teachersWithResources || [];
    const handleRowClick = (res) => {
        const teacherId = res.teacher_id;
        navigate(`/modifyTeacher/${teacherId}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(SelectionDropdown, { data: teachersWithResources, options: selectionOptions, toggle: 'selectTeachers', setSelectedData: setSelectedData }) }), _jsx("div", { className: "projects-table", children: _jsxs(Table, { hover: true, size: 'sm', className: "table-custom", children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px" }, children: [_jsx("th", {}), _jsx("th", { children: t('totRes') }), _jsx("th", { children: t('usedRes') }), _jsx("th", { children: t('studyYear') })] }) }), _jsx("tbody", { children: dataToDisplay.map((teacher) => (_jsxs("tr", { style: { fontSize: "13px" }, onClick: () => handleRowClick(teacher), children: [_jsxs("td", { className: "align-middle", style: { display: "flex", flexDirection: "column" }, children: [_jsx("div", { style: { fontWeight: "bold" }, children: teacher.name }), _jsx("div", { children: teacher.email })] }), _jsx("td", { children: teacher.total_resources }), _jsx("td", { children: teacher.used_resources }), _jsx("td", { children: teacher.study_year })] }, teacher.resource_id))) })] }) })] }));
};
export default TeachersList;
