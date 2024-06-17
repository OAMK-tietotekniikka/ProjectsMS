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
import { Container, Row, Col } from 'react-bootstrap';
import ProjectForm from '../components/ProjectForm';
import { useTranslation } from 'react-i18next';
import { addProject } from '../contexts/apiRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const AddNewProject = () => {
    const { t } = useTranslation();
    const handleFormSubmit = (formData, companyName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`from AddNewProject: ${JSON.stringify(formData)}`);
        const response = yield addProject(formData);
        if (response.status === 201) {
            alert(t('projCreated'));
        }
        else {
            alert(t('projNotCreated'));
        }
    });
    return (_jsx(Container, { children: _jsx(Row, Object.assign({ className: "justify-content-center" }, { children: _jsxs(Col, Object.assign({ xs: 10, md: 8, lg: 6 }, { children: [_jsx("h4", Object.assign({ className: 'main-heading' }, { children: t('createProj') })), _jsx("div", Object.assign({ className: 'instruction ' }, { children: _jsx("p", { children: t('projInstruction') }) })), _jsx(ProjectForm, { onSubmit: handleFormSubmit })] })) })) }));
};
export default AddNewProject;
