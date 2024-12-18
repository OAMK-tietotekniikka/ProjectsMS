import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { useTeachersContext } from '../contexts/teachersContext';
import { useStudentsContext } from '../contexts/studentsContext';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { newTeacher } from '../interface/teacher';
import { newStudent } from '../interface/student';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const SignInPageWithEntra: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser, setToken } = useUserContext();
    const { getTeacherByEmail, addNewTeacher } = useTeachersContext();
    const { getStudentByEmail, addNewStudent } = useStudentsContext();
    const { instance, accounts } = useMsal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        instance.loginRedirect(loginRequest)
            .catch(e => {
                console.log(e);
            });
    }

    const fetchAccessToken = async () => {
        if (accounts.length > 0) {
            try {
                const response = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                });

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

                // Get user role from token              
                const userRole = idToken?.groups[0];
                console.log("User role:", userRole);
                const userEmail = idToken?.email?.toString();
                console.log("User email:", userEmail);

                // if teacher or student is already in the database, get their data
                // if not, add new student/teacher to the database
                if (idToken && userRole === "10073ee5-6b85-4701-ada7-e6bad5c4718d") {
                    setUser("teacher");
                    localStorage.setItem('user', "teacher");

                    const teacher = await getTeacherByEmail(userEmail);
                    
                    if (teacher !== null) {
                        navigate("/teacher", { replace: true });
                    } else {
                        const Teacher: newTeacher = {
                            teacher_name: idToken.name,
                            email: userEmail,
                        }
                        const response = await addNewTeacher(Teacher);
                        if (response.teacher_id) {
                            navigate("/teacher", { replace: true });
                        } else {
                            console.log("Failed to add new teacher");
                            alert("Failed to add new teacher, please try again.");
                        }
                    }
                } else if (idToken && userRole === "559e9aa0-84e4-49ac-b339-b41ae22740fa") {
                    setUser("student");
                    localStorage.setItem('user', "student");

                    const student = await getStudentByEmail(userEmail);
                    console.log("Student:", student);

                    if (student !== null) {
                        navigate("/student", { replace: true });
                    } else {
                        const Student: newStudent = {
                            student_name: idToken.name,
                            email: userEmail,
                            class_code: null,
                        }
                        const response = await addNewStudent(Student);
                        if (response.student_id) {
                            navigate("/student", { replace: true });
                        } else {
                            console.log("Failed to add new student");
                            alert("Failed to add new student, please try again.");
                        }
                    }
                } else {
                    console.log("User role not recognized");
                    alert("User role not recognized, please try again.");
                }
            } catch (error) {
                console.log("Failed to acquire access token:", error);
            }
        }
    };
    useEffect(() => {
        fetchAccessToken();
    }, [accounts]);

    return (
        <Container className="main-container2">
            <Row className="d-flex justify-content-center">
                <Col md={12} lg={8}>
                    <h5>{t('welcome')}</h5>
                    <h6 style={{ marginTop: "6%" }}>{t('enter')}:</h6>
                    <Button className='resources-button' onClick={(e) => handleClick(e)}>
                        {t('login')}
                    </Button>
                    <h6 style={{ marginTop: "6%" }}>{t('furtherNote')}</h6>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInPageWithEntra;
