import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const PastResources = ({ study_year, resources, id, showTable, handleClose }) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    if (!showTable)
        return null;
    // Filter resources by teacher id and sort ascending by study year
    const filteredResources = resources.filter(resource => {
        const resourceYear = parseInt(resource.study_year.split('-')[0], 10);
        return resource.teacher_id === id && resourceYear < currentYear && resource.study_year !== study_year;
    });
    filteredResources === null || filteredResources === void 0 ? void 0 : filteredResources.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
        return yearA - yearB;
    });
    return (_jsxs("div", { className: "resources-table", children: [_jsxs(Table, { hover: true, size: 'sm', children: [_jsx("thead", { children: _jsxs("tr", { style: { fontSize: "13px", backgroundColor: "#eaeaea" }, children: [_jsx("th", { children: t('studyYear') }), _jsx("th", { children: t('totRes') }), _jsx("th", { children: t('usedRes') })] }) }), _jsx("tbody", { children: filteredResources ? filteredResources.map((resource, index) => (_jsxs("tr", { style: { fontSize: "13px", backgroundColor: "#eaeaea" }, children: [_jsx("td", { children: resource.study_year }), _jsx("td", { children: resource.total_resources }), _jsx("td", { children: resource.used_resources })] }, index)))
                            : null })] }), _jsx(Button, { className: 'resources-button', onClick: handleClose, children: t('close') })] }));
};
export default PastResources;
