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
import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { useTeachersContext } from '../contexts/teachersContext';
import { useStudentsContext } from '../contexts/studentsContext';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
const SignInPageWithEntra = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, setToken } = useUserContext();
    const { getTeacherByEmail, addNewTeacher } = useTeachersContext();
    const { getStudentByEmail, addNewStudent } = useStudentsContext();
    const { instance, accounts } = useMsal();
    const handleClick = (e) => {
        e.preventDefault();
        instance.loginRedirect(loginRequest)
            .catch(e => {
            console.log(e);
        });
    };
    const fetchAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
        if (accounts.length > 0) {
            try {
                const response = yield instance.acquireTokenSilent(Object.assign(Object.assign({}, loginRequest), { account: accounts[0] }));
                const accessToken = response.accessToken;
                setToken(accessToken);
                //token is now stored in local storage to prevent losing data on refresh, but this is not secure
                //should be replaced with a more secure storage method
                localStorage.setItem('token', accessToken);
                const account = accounts[0];
                const idToken = account.idTokenClaims;
                console.log("ID Token:", idToken);
                // Decode token header and payload to get data
                const header = JSON.parse(atob(accessToken.split('.')[0]));
                console.log("Decoded access token header:", header);
                const payload = JSON.parse(atob(accessToken.split('.')[1]));
                console.log("Decoded access token payload:", payload);
                // if teacher or student is already in the database, get their data
                // if not, add new student/teacher to the database
                const userRole = idToken === null || idToken === void 0 ? void 0 : idToken.roles[0];
                setUser(userRole);
                localStorage.setItem('user', userRole);
                if (idToken && userRole === "teacher") {
                    const teacher = yield getTeacherByEmail((idToken.email.toString()));
                    if (teacher !== null) {
                        navigate("/teacher", { replace: true });
                    }
                    else {
                        const Teacher = {
                            teacher_name: idToken.name,
                            email: (idToken.email).toString(),
                        };
                        const response = yield addNewTeacher(Teacher);
                        if (response.teacher_id) {
                            navigate("/teacher", { replace: true });
                        }
                        else {
                            console.log("Failed to add new teacher");
                            alert("Failed to add new teacher, please try again.");
                        }
                    }
                }
                else if (idToken && userRole === "student") {
                    const student = yield getStudentByEmail((idToken.email).toString());
                    if (student !== null) {
                        navigate("/student", { replace: true });
                    }
                    else {
                        const Student = {
                            student_name: idToken.name,
                            email: (idToken.email).toString(),
                            class_code: null,
                        };
                        const response = yield addNewStudent(Student);
                        if (response.student_id) {
                            navigate("/student", { replace: true });
                        }
                        else {
                            console.log("Failed to add new student");
                            alert("Failed to add new student, please try again.");
                        }
                    }
                }
            }
            catch (error) {
                console.log("Failed to acquire access token:", error);
            }
        }
    });
    useEffect(() => {
        fetchAccessToken();
    }, [accounts]);
    return (_jsx(Container, { className: "main-container2", children: _jsx(Row, { className: "d-flex justify-content-center", children: _jsxs(Col, { md: 12, lg: 8, children: [_jsx("h5", { children: t('welcome') }), _jsxs("h6", { style: { marginTop: "6%" }, children: [t('enter'), ":"] }), _jsx(Button, { className: 'resources-button', onClick: (e) => handleClick(e), children: t('login') }), _jsx("h6", { style: { marginTop: "6%" }, children: t('furtherNote') })] }) }) }));
};
export default SignInPageWithEntra;
