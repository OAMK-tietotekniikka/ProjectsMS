import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const TeacherDashboard: React.FC = () => {
    const { resources } = useTeachersContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const stydyYear = getStudyYear(currentDate);

    // teacher_id and teacher name below will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = resources.find((resource) => resource.study_year === stydyYear && resource.teacher_id === 1);

    return (
        <Container className='teacher-main-container'>
            <Row style={{width: "100%"}}>
                <Col xs={12} md={10} lg={8}>
                    <div>
                        <h4>Teacher Name</h4>
                        <div style={{ fontSize: "14px" }}>teacher@email</div>
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('resourcesCurr')} {stydyYear} </div>
                        {teacherCurrentResource ? (
                            <>
                                <div style={{ fontSize: "14px", paddingLeft: "5%" }}>
                                    {t('totRes')} {teacherCurrentResource.total_resources}
                                </div>
                                <div style={{ fontSize: "14px", paddingLeft: "5%" }}>
                                    {t('usedRes')} {teacherCurrentResource.used_resources}
                                </div>
                            </>
                        ) : (
                            <div style={{ fontSize: "14px", paddingLeft: "5%" }}>
                                {t('notResources')}
                            </div>
                        )}
                    </div>
                    <div className='item-group'>
                        <Button className='resources-button'>{t('resourcesPast')}</ Button>
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('addCompFavo')}</div>
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsCurr')}</div>
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsPast')}</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherDashboard;
