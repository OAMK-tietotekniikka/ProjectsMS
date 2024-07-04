import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';


const StudentDashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container className='main-container'>
            <Row>
                <Col>
                    <Link to="/form">{t('addProject')}</ Link>
                </Col>
            </Row>
        </Container>
    );
};

export default StudentDashboard;


