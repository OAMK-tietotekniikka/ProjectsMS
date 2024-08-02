import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
;
const SelectionDropdown = ({ data, options, toggle, setSelectedData }) => {
    const { t } = useTranslation();
    const [studyYearList, setStudyYearList] = useState([]);
    const [classCodeList, setClassCodeList] = useState([]);
    const [showSecondSelection, setShowSecondSelection] = useState("");
    const [name, setName] = useState("");
    const handleSelection = (e, item) => {
        e.preventDefault();
        if (item === options[0]) {
            setSelectedData(data);
            setShowSecondSelection("");
        }
        else if (item === "selectByYear") {
            const studyYears = data.map((item) => item.study_year);
            const uniqueStudyYears = [...new Set(studyYears)];
            setStudyYearList(uniqueStudyYears);
            setShowSecondSelection("studyYear");
        }
        else if (item === "selectByClass") {
            const classCodes = data.map((item) => item.class_code);
            const uniqueClassCodes = [...new Set(classCodes)];
            setClassCodeList(uniqueClassCodes);
            setShowSecondSelection("classCode");
        }
        else {
            setShowSecondSelection("name");
        }
    };
    const handleStudyYear = (e, item) => {
        e.preventDefault();
        const filteredData = data.filter((data) => data.study_year === item);
        setSelectedData(filteredData);
    };
    const handleClassCode = (e, item) => {
        e.preventDefault();
        const filteredData = data.filter((data) => data.class_code === item);
        setSelectedData(filteredData);
    };
    const handleChange = (value) => {
        if (value !== '') {
            setName(value);
        }
    };
    const handleNameSelection = () => {
        const filteredData = data.filter((data) => (data.name).toLowerCase() === name.toLowerCase());
        if (filteredData.length === 0) {
            setSelectedData([]);
            alert("Name not found");
        }
        else {
            setSelectedData(filteredData);
        }
    };
    return (_jsx(Container, { style: { paddingLeft: "0px", marginTop: "2%" }, children: _jsx(Col, { children: _jsxs("div", { className: 'dropdown-row', children: [_jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: t(toggle) }), _jsx(Dropdown.Menu, { children: options.map((item, index) => (_jsx(Dropdown.Item, { onClick: (e) => handleSelection(e, item), className: "dropdown-item", href: "#/action-${index}", children: t(item) }, index))) })] }), _jsxs("div", { style: { marginLeft: "12%" }, children: [showSecondSelection === "studyYear" && (_jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: t('selectByStudyYear') }), _jsx(Dropdown.Menu, { children: (studyYearList === null || studyYearList === void 0 ? void 0 : studyYearList.map((item, index) => (_jsx(Dropdown.Item, { onClick: (e) => handleStudyYear(e, item), className: "dropdown-item", href: "#/action-${index}", children: item }, index)))) || _jsx(Dropdown.Item, { children: t('noComp') }) })] })), showSecondSelection === "classCode" && (_jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: t('selectClass') }), _jsx(Dropdown.Menu, { children: (classCodeList === null || classCodeList === void 0 ? void 0 : classCodeList.map((item, index) => (_jsx(Dropdown.Item, { onClick: (e) => handleClassCode(e, item), className: "dropdown-item", href: "#/action-${index}", children: item }, index)))) || _jsx(Dropdown.Item, { children: t('noComp') }) })] })), showSecondSelection === "name" && (_jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [_jsx(Form, { children: _jsx(Form.Control, { type: "text", placeholder: t('enterNote'), style: { width: "300px", fontSize: "13px" }, onChange: (e) => handleChange(e.target.value), value: name }) }), _jsx(Button, { style: { marginLeft: "20%", marginTop: "4%" }, type: 'button', className: 'addCompany-button', onClick: handleNameSelection, children: t('selectName') })] }))] })] }) }) }));
};
export default SelectionDropdown;
