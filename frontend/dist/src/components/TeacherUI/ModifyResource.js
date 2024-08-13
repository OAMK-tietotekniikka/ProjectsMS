import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getStudyYear } from '../GetStudyYear';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import '../../App.css';
const ModifyResource = ({ teacherId, handleClose }) => {
    const { t } = useTranslation();
    const currentDate = new Date();
    const currentStudyYear = getStudyYear(currentDate);
    const nextStudyYear = currentStudyYear.split('-')[1] + '-' + (parseInt(currentStudyYear.split('-')[1]) + 1);
    const [studyYear, setStudyYear] = useState();
    const [totalResources, setTotalResources] = useState(undefined);
    const { resources, updateTeacherResource, addTeacherResource } = useTeachersContext();
    const handleChange = (value) => {
        if (value !== '') {
            setTotalResources(parseInt(value));
        }
    };
    const handleSave = (e) => {
        e.preventDefault();
        const teacherCurrentResource = resources.find(res => res.teacher_id === teacherId && res.study_year === studyYear);
        if (!teacherCurrentResource) {
            const newResource = {
                teacher_id: teacherId,
                total_resources: totalResources,
                used_resources: 0,
                study_year: studyYear
            };
            addTeacherResource(newResource);
            handleClose();
        }
        else {
            const modifiedResource = {
                teacher_id: teacherCurrentResource.teacher_id,
                total_resources: totalResources,
                used_resources: teacherCurrentResource.used_resources,
                study_year: teacherCurrentResource.study_year,
            };
            updateTeacherResource(teacherCurrentResource.resource_id, modifiedResource);
            handleClose();
        }
        ;
    };
    return (_jsx(Container, { className: 'modifyRes-container', children: _jsxs(Col, { children: [_jsxs("div", { style: { fontSize: "medium", fontWeight: "bold", paddingTop: "5px" }, children: [t('selectStudyYear'), ":"] }), _jsxs(Row, { style: { padding: "10px" }, children: [_jsx(Col, { xs: 6, lg: 3, children: _jsx(Button, { variant: "outline-secondary", onClick: () => setStudyYear(currentStudyYear), active: studyYear === currentStudyYear, children: currentStudyYear }) }), _jsx(Col, { xs: 6, lg: 3, children: _jsx(Button, { variant: "outline-secondary", onClick: () => setStudyYear(nextStudyYear), active: studyYear === nextStudyYear, children: nextStudyYear }) })] }), _jsxs(Row, { className: 'modify-resources', children: [_jsx(Col, { className: 'res-column', xs: 12, lg: 6, children: _jsxs("div", { children: [t('enterRes'), " ", _jsx("strong", { children: studyYear }), ":"] }) }), _jsx(Col, { className: 'res-column', xs: 12, lg: 3, children: _jsx("input", { style: { width: "150px", paddingLeft: "20px" }, type: "number", name: "totalResources", value: totalResources !== null && totalResources !== void 0 ? totalResources : '', onChange: (e) => handleChange(e.target.value) }) }), _jsx(Col, { className: 'res-column', xs: 12, lg: 3, children: _jsx(Button, { className: 'addCompany-button', onClick: (e) => handleSave(e), children: t('save') }) })] })] }) }));
};
export default ModifyResource;
