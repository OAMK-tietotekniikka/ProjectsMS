import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TeachersList from '../components/TeacherUI/TeachersList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Teachers: React.FC = () => {
    const { t } = useTranslation();


    return (
        <Container className='teacher-main-container'>
            <Row style={{ width: "100%" }}>
                <Col xs={12} md={12} lg={11}>
                    <h4>{t('teachersMain')}</h4>
                    <TeachersList />
                    <div className='second-heading'>{t('addTeacher')}</div>
                    <div>this functionality needs to be added</div>
                </Col>
            </Row>
        </Container>
    );
};

export default Teachers;