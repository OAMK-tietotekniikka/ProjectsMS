import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getStudyYear } from '../GetStudyYear';
import { useTranslation } from 'react-i18next';
import { newResource } from '../../interface/newResource';
import { useTeachersContext } from '../../contexts/teachersContext';
import '../../App.css'


interface ModifyResourceProps {
    teacherId: number;
    handleClose?: () => void;
}

const ModifyResource: React.FC<ModifyResourceProps> = ({ teacherId, handleClose }) => {
    const { t } = useTranslation();
    const currentDate = new Date();
    const currentStudyYear = getStudyYear(currentDate);
    const nextStudyYear = currentStudyYear.split('-')[1] + '-' + (parseInt(currentStudyYear.split('-')[1]) + 1);
    const [studyYear, setStudyYear] = useState<string>();
    const [totalResources, setTotalResources] = useState<number | undefined>(undefined);
    const { resources, updateTeacherResource, addTeacherResource } = useTeachersContext();

    const handleChange = (value: string) => {
        if (value !== '') {
            setTotalResources(parseInt(value));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const teacherCurrentResource = resources.find(res => res.teacher_id === teacherId && res.study_year === studyYear);
        if (!teacherCurrentResource) {
            const newResource: newResource = {
                teacher_id: teacherId,
                total_resources: totalResources,
                used_resources: 0,
                study_year: studyYear
            };
            addTeacherResource(newResource);
            handleClose();

        } else {
            const modifiedResource: newResource = {
                teacher_id: teacherCurrentResource.teacher_id,
                total_resources: totalResources,
                used_resources: teacherCurrentResource.used_resources,
                study_year: teacherCurrentResource.study_year,
            };
            updateTeacherResource(teacherCurrentResource.resource_id, modifiedResource);
            handleClose();
        };
        
    };

    return (
        <Container className='modifyRes-container'>
            <Col>
                <div style={{ fontSize: "medium", fontWeight: "bold", paddingTop: "5px" }}>{t('selectStudyYear')}:</div>
                <Row style={{ padding: "10px" }}>
                    <Col xs={6} lg={3}>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setStudyYear(currentStudyYear)}
                            active={studyYear === currentStudyYear}
                        >
                            {currentStudyYear}
                        </Button>
                    </Col>
                    <Col xs={6} lg={3}>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setStudyYear(nextStudyYear)}
                            active={studyYear === nextStudyYear}
                        >
                            {nextStudyYear}
                        </Button>
                    </Col>
                </Row>

                <Row className='modify-resources'>
                    <Col className='res-column' xs={12} lg={6}>
                        <div>{t('enterRes')} <strong>{studyYear}</strong>:</div>
                    </Col>
                    <Col className='res-column' xs={12} lg={3}>
                        <input
                            style={{ width: "150px", paddingLeft: "20px" }}
                            type="number"
                            name="totalResources"
                            value={totalResources ?? ''}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </Col>
                    <Col className='res-column' xs={12} lg={3}>
                        <Button
                            className='addCompany-button'
                            onClick={(e) => handleSave(e)}
                        >
                            {t('save')}
                        </Button>
                    </Col>
                </Row>
            </Col>

        </Container>
    );
};

export default ModifyResource;