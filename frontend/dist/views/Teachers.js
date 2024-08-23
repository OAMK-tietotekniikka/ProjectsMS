import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TeachersList from '../components/TeacherUI/TeachersList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const Teachers = () => {
    const { t } = useTranslation();
    return (_jsx(Container, { className: 'teacher-main-container', children: _jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { xs: 12, md: 12, lg: 11, children: [_jsx("h4", { children: t('teachersMain') }), _jsx(TeachersList, {}), _jsx("div", { className: 'second-heading', children: t('addTeacher') }), _jsx("div", { children: "this functionality needs to be added" })] }) }) }));
};
export default Teachers;
