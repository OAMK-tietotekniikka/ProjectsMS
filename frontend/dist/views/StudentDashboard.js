import { jsx as _jsx } from "react/jsx-runtime";
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
const StudentDashboard = () => {
    const { t } = useTranslation();
    return (_jsx(Container, Object.assign({ className: 'main-container' }, { children: _jsx(Row, { children: _jsx(Col, { children: _jsx(Link, Object.assign({ to: "/form" }, { children: t('addProject') })) }) }) })));
};
export default StudentDashboard;
