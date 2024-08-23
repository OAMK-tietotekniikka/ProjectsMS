import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import SelectionDropdown from './SelectionDropdown';
import { useNavigate } from 'react-router-dom';
import { getStudyYear } from '../GetStudyYear';
const TeachersList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { teachers, resources } = useTeachersContext();
    const [selectedData, setSelectedData] = useState([]);
    const selectionOptions = ['selectAll', 'selectByName'];
    const currStudyYear = getStudyYear(new Date());
    // Create a map of teacher IDs to resources
    const resourcesByTeacherId = resources === null || resources === void 0 ? void 0 : resources.reduce((acc, resource) => {
        if (!acc[resource.teacher_id]) {
            acc[resource.teacher_id] = [];
        }
        acc[resource.teacher_id].push(resource);
        return acc;
    }, {});
    // Build the teachersWithResources array
    const teachersWithResources = teachers === null || teachers === void 0 ? void 0 : teachers.map(teacher => {
        var _a, _b;
        const teacherResources = (resourcesByTeacherId === null || resourcesByTeacherId === void 0 ? void 0 : resourcesByTeacherId[teacher.teacher_id]) || [];
        const currentYearResource = (teacherResources === null || teacherResources === void 0 ? void 0 : teacherResources.find(resource => resource.study_year === currStudyYear)) || {};
        const teacherName = `${(_a = teacher.first_name) !== null && _a !== void 0 ? _a : ''} ${(_b = teacher.last_name) !== null && _b !== void 0 ? _b : ''}`.trim();
        if (currentYearResource.teacher_id) {
            return Object.assign(Object.assign({}, currentYearResource), { name: teacherName, email: teacher.email || 'Unknown Email' });
        }
        else {
            return {
                teacher_id: teacher.teacher_id,
                name: teacherName,
                email: teacher.email || 'Unknown Email',
                total_resources: 0,
                used_resources: 0,
                study_year: 'N/A'
            };
        }
    });
    const dataToDisplay = (selectedData === null || selectedData === void 0 ? void 0 : selectedData.length) > 0 ? selectedData : teachersWithResources || [];
    const handleRowClick = (res) => {
        const teacherId = res.teacher_id;
        navigate(`/modifyTeacher/${teacherId}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(SelectionDropdown, { data: teachersWithResources, options: selectionOptions, toggle: 'selectTeachers', setSelectedData: setSelectedData }) }), _jsx("div", { className: "projects-table", children: _jsxs(Table, { hover: true, size: 'sm', className: "table-custom", children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px" }, children: [_jsx("th", {}), _jsxs("th", { children: [t('totRes'), " ", currStudyYear, ":"] }), _jsxs("th", { children: [t('usedRes'), " ", currStudyYear, ":"] })] }) }), _jsx("tbody", { children: dataToDisplay.map((teacher, index) => (_jsxs("tr", { style: { fontSize: "13px" }, onClick: () => handleRowClick(teacher), children: [_jsxs("td", { className: "align-middle", style: { display: "flex", flexDirection: "column" }, children: [_jsx("div", { style: { fontWeight: "bold" }, children: teacher.name }), _jsx("div", { children: teacher.email })] }), _jsx("td", { children: teacher.total_resources }), _jsx("td", { children: teacher.used_resources })] }, index))) })] }) })] }));
};
export default TeachersList;
