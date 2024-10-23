// import React from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { useUserContext } from '../contexts/userContext';
// import { useNavigate } from 'react-router-dom';
// import { UserLogin } from '../interface/userLogin';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css'


// const LandingPage: React.FC = () => {
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const { user, setUser, login } = useUserContext();
//     const [clickedButton, setClickedButton] = React.useState<string>("");
//     const [loginData, setLoginData] = React.useState<UserLogin>({
//         email: "",
//         password: ""
//     })

//     const handleClick = (e: any, user: string) => {
//         e.preventDefault();
//         setClickedButton(user);
//         setUser(user);
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         localStorage.setItem('user', user);
//         const resp = await login(loginData)
//         if (resp === "ok") {
//             navigate(`/${user}`);
//         }
        
//     }

//     return (
//         <Container className='main-container'>
//             <Row className="d-flex justify-content-center">
//                 <Col lg={8}>
//                     <h5>{t('welcome')}</h5>
//                     <h6 style={{ marginTop: "6%" }}>{t('login')}</h6>
//                     <div className="login-buttons-div">
//                         <Button onClick={
//                             (e) => handleClick(e, "teacher")}
//                             className={`login-button ${clickedButton === "teacher" ? "active" : ""}`}
//                             variant={clickedButton === "teacher" ? "primary" : "outline-primary"}>
//                             {t('teacherLogin')}
//                         </Button>
//                         <Button onClick={
//                             (e) => handleClick(e, "student")}
//                             className={`login-button ${clickedButton === "student" ? "active" : ""}`}
//                             variant="primary">{t('studentLogin')}</Button>
//                     </div>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className='form-item' controlId="formBasicUsername">
//                             <Form.Label>{t('username')}</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 placeholder={t('enterUsername')}
//                                 value={loginData.email}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className='form-item' controlId="formBasicPassword">
//                             <Form.Label>{t('password')}</Form.Label>
//                             <Form.Control
//                             type="password"
//                             name="password"
//                             placeholder={t('enterPassword')}
//                             value={loginData.password}
//                             onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Button className='submit-login' type="submit" disabled={ loginData.email === "" || loginData.password === "" || user === ""}>
//                             {t('login')}
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default LandingPage;



// import React, { useEffect } from 'react';
// import { useMsal } from '@azure/msal-react';
// import { useUserContext } from '../contexts/userContext';
// import StudentDashboard from './StudentDashboard';
// import TeacherDashboard from './TeacherDashboard';
// import { Button } from 'react-bootstrap';

// interface IdTokenClaims {
//   roles?: string[];
// }

// const LandingPage: React.FC = () => {
//   const { instance } = useMsal();
//   const { user, setUser, login, logout } = useUserContext();

//   const handleLogin = async () => {
//     const token = await instance.acquireTokenPopup({
//       scopes: ['user.read'],
//     });

//     const claims = token.idTokenClaims as IdTokenClaims;
//     const roles = claims.roles || [];

//     Set user role in context
//     if (roles.includes('student')) {
//       setUser('student');
//     } else if (roles.includes('teacher')) {
//       setUser('teacher');
//     }

//     console.log(token);
//   };

//   const handleLogout = async () => {
//     await instance.logoutPopup();
//     logout();
//   };

//   useEffect(() => {
//     Check if user is already logged in and set the role accordingly
//     const accounts = instance.getAllAccounts();
//     if (accounts.length > 0) {
//       instance.acquireTokenSilent({
//         scopes: ['user.read'],
//         account: accounts[0],
//       }).then((response) => {
//         const claims = response.idTokenClaims as IdTokenClaims;
//         const roles = claims.roles || [];

//         if (roles.includes('student')) {
//           setUser('student');
//         } else if (roles.includes('teacher')) {
//           setUser('teacher');
//         }
//       });
//     }
//   }, [instance, setUser]);

//   return (
//     <div>
//       {user === '' ? (
//         <div>
//           <h1>Landing Page</h1>
//           <h2>Welcome to the application</h2>
//           <p>Please log in to continue</p>
//           <Button onClick={handleLogin} variant='primary' size='lg'>
//             Login
//           </Button>
//         </div>
//       ) : (
//         <div>
//           <Button onClick={handleLogout} variant='danger' size='lg'>
//             Logout
//           </Button>
//           {user === 'student' && <StudentDashboard />}
//           {user === 'teacher' && <TeacherDashboard />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LandingPage;

import React, { useEffect } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useUserContext } from '../contexts/userContext';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import { Button } from 'react-bootstrap';

interface IdTokenClaims {
  roles?: string[];
}

const LandingPage: React.FC = () => {
  const { instance } = useMsal();
  const { user, setUser, login, logout } = useUserContext();

  const handleLogin = async () => {
    const token = await instance.acquireTokenPopup({
      scopes: ['user.read'],
    });

    const claims = token.idTokenClaims as IdTokenClaims;
    const roles = claims.roles || [];

    // Set user role in context
    if (roles.includes('student')) {
      setUser('student');
    } else if (roles.includes('teacher')) {
      setUser('teacher');
    }

    console.log(token);
  };

  const handleLogout = async () => {
    await instance.logoutPopup();
    logout();
  };

  useEffect(() => {
    // Check if user is already logged in and set the role
    const checkUserRole = async () => {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        const token = await instance.acquireTokenSilent({
          scopes: ['user.read'],
          account: accounts[0],
        });

        const claims = token.idTokenClaims as IdTokenClaims;
        const roles = claims.roles || [];

        // Set user role in context
        if (roles.includes('student')) {
          setUser('student');
        } else if (roles.includes('teacher')) {
          setUser('teacher');
        }
      }
    };

    checkUserRole();
  }, [instance, setUser]);

  return (
    <>
      <AuthenticatedTemplate>
        {user === 'student' && <StudentDashboard />}
        {user === 'teacher' && <TeacherDashboard />}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>
          <h1>Welcome to the Application</h1>
          {/* <Button onClick={handleLogin} variant="primary">Login</Button> */}
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};

export default LandingPage;