import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import PastResources from '../components/PastResources';
import FavoCompDropdown from '../components/FavoCompDropdown';
import OngoingProjectsList from '../components/OngoingProjectsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'



const TeacherDashboard: React.FC = () => {
    const { resources } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const stydyYear = getStudyYear(currentDate);
    const [ showPastResources, setShowPastResources ] = useState(false);

    // teacher_id and teacher name below will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = resources.find((resource) => resource.study_year === stydyYear && resource.teacher_id === 1);

    return (
        <Container className='teacher-main-container'>
            <Row style={{width: "100%"}}>
                <Col xs={12} md={10} lg={11}>
                    <div>
                        <h4>Teacher Name</h4>
                        <div style={{ fontSize: "small" }}>teacher@email</div>
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('resourcesCurr')} {stydyYear} </div>
                        {teacherCurrentResource ? (
                            <>
                                <div style={{ fontSize: "medium", paddingLeft: "5%" }}>
                                    {t('totRes')} {teacherCurrentResource.total_resources}
                                </div>
                                <div style={{ fontSize: "medium", paddingLeft: "5%" }}>
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
                        <Button onClick={() => setShowPastResources(true)} className='resources-button'>{t('resourcesPast')}</ Button>
                        {showPastResources ? <PastResources resources={resources} id={1} showTable={showPastResources} handleClose={() => setShowPastResources(false)} /> : null}
                    </div>

                    <div className='item-group'>
                        <div className='second-heading'>{t('addCompFavo')}</div>
                        <FavoCompDropdown data={companies} />
                    </div>
                    
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsCurr')}</div>
                        <OngoingProjectsList />
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
