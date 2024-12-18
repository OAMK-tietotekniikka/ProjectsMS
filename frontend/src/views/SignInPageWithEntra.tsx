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
    const { user, setUser, token, setToken } = useUserContext();
    const { getTeacherByEmail, addNewTeacher } = useTeachersContext();
    const { getStudentByEmail, addNewStudent } = useStudentsContext();
    const { instance, accounts } = useMsal();

    useEffect(() => {
        if (token && user) {
          // Redirect immediately if user and token are already set
          navigate(user === "teacher" ? "/teacher" : "/student", { replace: true });
          return;
        }
    
        const fetchAccessToken = async () => {
          if (accounts.length > 0) {
            try {
              const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
              });
    
              const accessToken = response.accessToken;
              setToken(accessToken);
              localStorage.setItem('token', accessToken);
    
              const account = accounts[0];
              const idToken = account.idTokenClaims;
    
              const userRole = idToken?.groups[0];
              const userEmail = idToken?.email?.toString();
    
              if (idToken && userRole === "10073ee5-6b85-4701-ada7-e6bad5c4718d") {
                setUser("teacher");
                localStorage.setItem('user', "teacher");
    
                const teacher = await getTeacherByEmail(userEmail);
                if (teacher) {
                  navigate("/teacher", { replace: true });
                } else {
                  const newTeacherData: newTeacher = {
                    teacher_name: idToken.name,
                    email: userEmail,
                  };
                  const response = await addNewTeacher(newTeacherData);
                  if (response.teacher_id) {
                    navigate("/teacher", { replace: true });
                  } else {
                    alert("Failed to add new teacher, please try again.");
                  }
                }
              } else if (idToken && userRole === "559e9aa0-84e4-49ac-b339-b41ae22740fa") {
                setUser("student");
                localStorage.setItem('user', "student");
    
                const student = await getStudentByEmail(userEmail);
                if (student) {
                  navigate("/student", { replace: true });
                } else {
                  const newStudentData: newStudent = {
                    student_name: idToken.name,
                    email: userEmail,
                    class_code: null,
                  };
                  const response = await addNewStudent(newStudentData);
                  if (response.student_id) {
                    navigate("/student", { replace: true });
                  } else {
                    alert("Failed to add new student, please try again.");
                  }
                }
              } else {
                alert("User role not recognized.");
              }
            } catch (error) {
              console.error("Failed to acquire access token:", error);
            }
          }
        };
    
        fetchAccessToken();
      }, [accounts]);
    
      const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
          console.error(e);
        });
      };

    return (
        <Container className="main-container2">
            <Row className="d-flex justify-content-center">
                <Col md={12} lg={8}>
                    <h5>{t('welcome')}</h5>
                    <h6 style={{ marginTop: "6%" }}>{t('enter')}:</h6>
                    <Button className='resources-button' onClick={handleLogin}>
                        {t('login')}
                    </Button>
                    <h6 style={{ marginTop: "6%" }}>{t('furtherNote')}</h6>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInPageWithEntra;
