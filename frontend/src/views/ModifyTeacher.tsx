import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import PastResources from '../components/TeacherUI/PastResources';
import OngoingProjectsList from '../components/TeacherUI/OngoingProjectsList';
import PastProjectsList from '../components/TeacherUI/PastProjectsList';
import { useParams } from 'react-router-dom';
import ModifyResource from '../components/TeacherUI/ModifyResource';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const ModifyTeacher: React.FC = () => {
    const { t } = useTranslation();
    const { resources, teachers } = useTeachersContext();
    const currentDate = new Date();
    const studyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);
    const [showAddResources, setShowAddResources] = useState(false);
    const { id } = useParams<{ id: string }>();
    const teacherId = parseInt(id);

    // teacher_id will be replaced with the actual values when the teacher login is implemented
    const teacherCurrentResource = resources?.find((resource) => resource.study_year === studyYear && resource.teacher_id === teacherId) || null;
    const teacherDetails = teachers?.find((teacher) => teacher.teacher_id === teacherId) || null;

    return (
        <Container className='teacher-main-container'>
            <Row style={{ width: "100%" }}>
                <Col xs={12} md={12} lg={11}>
                    {teacherDetails ?
                        <div>
                            <h4>{teacherDetails.first_name} {teacherDetails.last_name}</h4>
                            <div style={{ fontSize: "small" }}>{teacherDetails.email}</div>
                        </div>
                        : "No teacher data"}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div className='item-group'>
                            <div className='second-heading'>{t('resourcesCurr')} {studyYear} </div>
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
                        <Button onClick={() => setShowAddResources(true)} className='resources-button'>{t('modifyRes')}</ Button>
                    </div>
                    <div>
                       {showAddResources ? <ModifyResource teacherId={teacherId} handleClose={() => setShowAddResources(false)}/> : null} 
                    </div>
                    <div className='item-group'>
                        <Button onClick={() => setShowPastResources(true)} className='resources-button' style={{ marginTop: "5%" }}>{t('resourcesPast')}</ Button>
                        {showPastResources ? <PastResources study_year={studyYear} resources={resources} id={teacherId} showTable={showPastResources} handleClose={() => setShowPastResources(false)} /> : null}
                    </div>
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsCurr')}</div>
                        <OngoingProjectsList teacherId={teacherId} />
                    </div>

                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsPast')}</div>
                        <PastProjectsList teacherId={teacherId} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ModifyTeacher;
