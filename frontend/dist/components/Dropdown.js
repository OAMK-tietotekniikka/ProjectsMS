import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../contexts/companiesContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const DropdownComponent = ({ dropdownHeading, data, valueName }) => {
    const { t } = useTranslation();
    const [companiesList, setCompaniesList] = useState([]);
    const { teacherFavoCompanies } = useCompaniesContext();
    useEffect(() => {
        setCompaniesList(teacherFavoCompanies.map((company) => company.company_name));
    }, [teacherFavoCompanies]);
    const addToList = (item) => {
        if (companiesList.includes(item)) {
            setCompaniesList(companiesList.filter((company) => company !== item));
            return;
        }
        setCompaniesList([...companiesList, item]);
    };
    return (_jsxs("div", { className: 'dropdown-row', children: [_jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { id: "dropdown-basic", className: 'dropdown-toggle', children: dropdownHeading }), _jsx(Dropdown.Menu, { children: data.map((item, index) => (_jsx(Dropdown.Item, { onClick: () => addToList(item[valueName]), className: 'dropdown-item', href: "#/action-1", active: companiesList.includes(item[valueName]), children: item[valueName] }, index))) })] }), _jsxs("div", { children: [_jsx("h5", { children: t('selectedCompList') }), _jsx("ul", { children: companiesList.map((item, index) => (_jsx("li", { children: item }, index))) })] })] }));
};
export default DropdownComponent;
