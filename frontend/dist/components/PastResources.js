import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const PastResources = ({ resources, id, showTable, handleClose }) => {
    const { t } = useTranslation();
    if (!showTable)
        return null;
    // Filter resources by teacher id and sort ascending by study year
    const filteredResources = resources.filter(resource => resource.teacher_id === id);
    filteredResources.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
        return yearA - yearB;
    });
    return (_jsxs("div", Object.assign({ className: "resources-table" }, { children: [_jsxs(Table, Object.assign({ hover: true, size: 'sm' }, { children: [_jsx("thead", { children: _jsxs("tr", Object.assign({ style: { fontSize: "13px", backgroundColor: "#eaeaea" } }, { children: [_jsx("th", { children: "Study Year" }), _jsx("th", { children: "Total Resources" }), _jsx("th", { children: "Used Resources" })] })) }), _jsx("tbody", { children: filteredResources.map((resource) => (_jsxs("tr", Object.assign({ style: { fontSize: "13px", backgroundColor: "#eaeaea" } }, { children: [_jsx("td", { children: resource.study_year }), _jsx("td", { children: resource.total_resources }), _jsx("td", { children: resource.used_resources })] }), resource.resource_id))) })] })), _jsx(Button, Object.assign({ onClick: handleClose }, { children: "Close" }))] })));
};
export default PastResources;
