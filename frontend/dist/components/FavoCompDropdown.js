var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { Container, Col, Form, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../contexts/companiesContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
;
const FavoCompDropdown = ({ data }) => {
    const { t } = useTranslation();
    const { teacherFavoCompanies, setTeacherFavoCompanies, addCompany, addFavoCompany } = useCompaniesContext();
    const [newCompany, setNewCompany] = useState('');
    const [favoCompanies, setFavoCompanies] = useState([]);
    useEffect(() => {
        if (teacherFavoCompanies) {
            const companiesList = teacherFavoCompanies.map(company => company);
            setFavoCompanies(companiesList);
        }
    }, [teacherFavoCompanies]);
    const addToList = (item) => {
        if (favoCompanies.some(company => company.company_id === item.company_id)) {
            setFavoCompanies(favoCompanies.filter(company => company.company_id !== item.company_id));
        }
        else {
            setFavoCompanies([...favoCompanies, item]);
        }
    };
    const saveSelection = () => __awaiter(void 0, void 0, void 0, function* () {
        // teacher_id below will be replaced with the actual value when the teacher login is implemented
        const teacherId = 1;
        if (favoCompanies.length === 0)
            return;
        setTeacherFavoCompanies(favoCompanies);
        addFavoCompany(favoCompanies, teacherId);
    });
    const handleChange = (value) => {
        if (value !== '') {
            setNewCompany(value);
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // teacher_id below will be replaced with the actual value when the teacher login is implemented
        const teacherId = 1;
        try {
            const companyId = yield addCompany(newCompany);
            if (companyId > 0) {
                const updatedFavoCompanies = [...favoCompanies, { company_id: companyId, company_name: newCompany, created_at: null }];
                setFavoCompanies(updatedFavoCompanies);
                addFavoCompany(updatedFavoCompanies, teacherId);
                setTeacherFavoCompanies(updatedFavoCompanies);
                setNewCompany('');
            }
        }
        catch (error) {
            console.error(`Unable to get companyId: ${error}`);
            return 0;
        }
    });
    return (_jsx(Container, Object.assign({ style: { paddingLeft: "0px", marginTop: "2%" } }, { children: _jsxs(Col, { children: [_jsx("div", { children: t('selectComp') }), _jsxs("div", Object.assign({ className: 'dropdown-row' }, { children: [_jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, Object.assign({ id: "dropdown-basic", className: 'dropdown-toggle' }, { children: t('select') })), _jsx(Dropdown.Menu, { children: data.map((item, index) => (_jsx(Dropdown.Item, Object.assign({ onClick: () => addToList(item), className: `dropdown-item ${favoCompanies.some(company => company.company_id === item.company_id) ? 'active' : ''}`, href: "#/action-${index}" }, { children: item.company_name }), index))) })] }), _jsxs("div", Object.assign({ style: { marginLeft: "20%" } }, { children: [_jsx("div", Object.assign({ className: "second-heading" }, { children: t('selectedCompList') })), _jsx(ListGroup, { children: (favoCompanies.length > 0) ? favoCompanies.map((item, index) => (_jsx(ListGroup.Item, Object.assign({ className: 'list-item' }, { children: item.company_name }), index))) : _jsx(ListGroup.Item, { children: t('noFavoComp') }) }), _jsx(Button, Object.assign({ style: { marginTop: "6px" }, className: 'addCompany-button', onClick: () => saveSelection() }, { children: t('saveSelection') }))] }))] })), _jsx("div", { children: t('enterNewComp') }), _jsxs("div", Object.assign({ className: 'dropdown-row' }, { children: [_jsx(Form, { children: _jsx(Form.Control, { type: "text", placeholder: "Enter company name", style: { width: "300px" }, onChange: (e) => handleChange(e.target.value), value: newCompany }) }), _jsx(Button, Object.assign({ style: { marginLeft: "20%" }, type: 'button', className: 'addCompany-button', onClick: handleSubmit }, { children: t('saveInput') }))] }))] }) })));
};
export default FavoCompDropdown;
