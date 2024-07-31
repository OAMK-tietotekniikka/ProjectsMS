import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../interface/userLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const LandingPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, setUser, login } = useUserContext();
    const [clickedButton, setClickedButton] = React.useState<string>("");
    const [loginData, setLoginData] = React.useState<UserLogin>({
        email: "",
        password: ""
    })

    const handleClick = (e: any, user: string) => {
        e.preventDefault();
        setClickedButton(user);
        setUser(user);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('user', user);
        const resp = await login(loginData)
        if (resp === "ok") {
            navigate(`/${user}`);
        }
        
    }

    return (
        <Container className='main-container'>
            <Row className="d-flex justify-content-center">
                <Col lg={8}>
                    <h5>{t('welcome')}</h5>
                    <h6 style={{ marginTop: "6%" }}>{t('login')}</h6>
                    <div className="login-buttons-div">
                        <Button onClick={
                            (e) => handleClick(e, "teacher")}
                            className={`login-button ${clickedButton === "teacher" ? "active" : ""}`}
                            variant={clickedButton === "teacher" ? "primary" : "outline-primary"}>
                            {t('teacherLogin')}
                        </Button>
                        <Button onClick={
                            (e) => handleClick(e, "student")}
                            className={`login-button ${clickedButton === "student" ? "active" : ""}`}
                            variant="primary">{t('studentLogin')}</Button>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='form-item' controlId="formBasicUsername">
                            <Form.Label>{t('username')}</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder={t('enterUsername')}
                                value={loginData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='form-item' controlId="formBasicPassword">
                            <Form.Label>{t('password')}</Form.Label>
                            <Form.Control
                            type="password"
                            name="password"
                            placeholder={t('enterPassword')}
                            value={loginData.password}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Button className='submit-login' type="submit" disabled={ loginData.email === "" || loginData.password === "" || user === ""}>
                            {t('login')}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
