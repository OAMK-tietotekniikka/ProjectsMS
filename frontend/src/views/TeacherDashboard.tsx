import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getStudyYear } from '../components/GetStudyYear';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import PastResources from '../components/TeacherUI/PastResources';
import FavoCompDropdown from '../components/TeacherUI/FavoCompDropdown';
import OngoingProjectsList from '../components/TeacherUI/OngoingProjectsList';
import PastProjectsList from '../components/TeacherUI/PastProjectsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const TeacherDashboard: React.FC = () => {
    const { resources, signedInTeacher, teachers } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const { t } = useTranslation();
    const currentDate = new Date();
    const studyYear = getStudyYear(currentDate);
    const [showPastResources, setShowPastResources] = useState(false);

    // teacher_id will be replaced with the actual values when the teacher login is implemented
    const teacherId = signedInTeacher?.teacher_id || null;
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
                    <div className='item-group'>
                        <Button onClick={() => setShowPastResources(true)} className='resources-button'>{t('resourcesPast')}</ Button>
                        {showPastResources ? <PastResources study_year={studyYear} resources={resources} id={teacherId} showTable={showPastResources} handleClose={() => setShowPastResources(false)} /> : null}
                    </div>
                    <hr className="hr-style"/>
                    <div className='item-group'>
                        <div className='second-heading'>{t('addCompFavo')}</div>
                        <FavoCompDropdown data={companies} />
                    </div>
                    <hr className="hr-style"/>
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsCurr')}</div>
                        <OngoingProjectsList teacherId={teacherId}/>
                    </div>
                    <hr className="hr-style"/>
                    <div className='item-group'>
                        <div className='second-heading'>{t('projectsPast')}</div>
                        <PastProjectsList teacherId={teacherId}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherDashboard;
