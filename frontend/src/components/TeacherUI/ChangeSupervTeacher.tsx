import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useTeachersContext } from '../../contexts/teachersContext';
import { getStudyYear } from '../GetStudyYear';
import 'bootstrap/dist/css/bootstrap.min.css';


interface ChangeSupervTeacherProps {
    setSelectedTeacher: (teacher: any) => void;
    selectedTeacher: any;
};

const ChangeSupervTeacher: React.FC<ChangeSupervTeacherProps> = ({setSelectedTeacher, selectedTeacher}) => {
    const { t } = useTranslation();
    const { teachers, resources } = useTeachersContext();
    const currStudyYear = getStudyYear(new Date());    

    const teachersWithResources = teachers?.map((teacher: any) => {
        const teacherResource = resources?.find((resource: any) => resource.teacher_id === teacher.teacher_id && resource.study_year === currStudyYear);
        return {
            ...teacher,
            total_resources: teacherResource?.total_resources || 0,
            used_resources: teacherResource?.used_resources || 0,
            resource_id: teacherResource?.resource_id,
        };
    });

    const handleSelection = (e: any, teacher: any) => {
        e.preventDefault();
        setSelectedTeacher(teacher);
    };
    const handleNoSupervisorSelection = (e: any) => {
        e.preventDefault();
        setSelectedTeacher(null);
    };

    return (
        <Container style={{ paddingLeft: "5px", margin: "0% 0% 2% 2%", backgroundColor: "#f0f0f0", width: "98%" }}>
            <Row className='dropdown-row'>
                <Col xs="12" lg="6">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                            {t('resourcesToggle')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item
                                onClick={handleNoSupervisorSelection}
                                className="dropdown-item"
                                href="#/no-supervisor"
                            >
                                <div className='dropdown-item-row'>
                                    <Col xs="12">
                                        {t('noSupervisor')}
                                    </Col>
                                </div>
                            </Dropdown.Item>
                            {teachersWithResources?.map((teacher: any, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={(e) => handleSelection(e, teacher)}
                                    className="dropdown-item"
                                    href={"#/action-${index}"}
                                >
                                    <div className='dropdown-item-row'>
                                        <Col xs="6">{teacher.teacher_name}</Col>
                                        <Col xs="6">{teacher.total_resources} / {teacher.used_resources}</Col>
                                    </div>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs="12" lg="6" style={{ marginTop: "20px", textAlign: "end" }}>
                    <div>
                        <div>{t('newSupervisingTeacher')}:</div>
                        {selectedTeacher ? (
                            <div style={{ fontSize: "small", fontWeight: "bold", paddingBottom: "10px"}}>{selectedTeacher.teacher_name}</div>
                        ) : (
                            <div>{t('notSelected')}</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
};

export default ChangeSupervTeacher;