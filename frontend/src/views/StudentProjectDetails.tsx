import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import DocumentsListing from "../components/StudentUI/DocumentsListing";
import NotesListing from "../components/StudentUI/NotesListing";
import ChangeProjectStatus from "../components/StudentUI/ChangeProjectStatus";
import { useProjectsContext } from "../contexts/projectsContext";
import { deleteProjectById } from "../contexts/apiRequests/projectsApiRequests";


const StudentProjectDetails = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { proj } = location.state || {};
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id);
    const [studentName, setStudentName] = useState<string>("");
    const navigate = useNavigate();
    const {deleteProject,projects,setProjects} = useProjectsContext();
    const handleChange = (value: string) => {
        if (value !== '') {
            setStudentName(value);
        }
    };

    const handleAddStudent = () => {
        console.log(studentName);
        console.log(proj.company_id);
        // Functionality to add student to project will be added here
    };

    const handleDeleteProject = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this project?");
        if (isConfirmed) {
            await deleteProjectById(projectId, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setProjects(projects.filter(project => project.project_id !== projectId));
            navigate('/student');
        }
    };


    return (
        <Container className="student-main-container">
            <Row className="student-main-row">
                <Col xs="12" lg="7">
                    <h4>{t('projectNo')} {proj.project_number}</h4>
                    <h6>{proj.project_name}</h6>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ fontWeight: "bold" }}>{t('projDesc')} :</div>
                        <div>{proj.project_description}</div>
                    </div>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('status')}</Col>
                        <Col>{t(proj.project_status)}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('company')}</Col>
                        <Col>{proj.company_name}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('startDate')}</Col>
                        <Col>{String(proj.start_date).split('T')[0]}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('dueDate')}</Col>
                        <Col>{String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0]}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('url')}</Col>
                        <Col>{proj.project_url ? proj.project_url : "no url added"}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('supervisor')}</Col>
                        <Col>{proj.teacher_name}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontWeight: "bold", color: "#5e5e5e" }}>{t('studInvolved')}</Col>
                        <Col style={{ display: "flex", flexDirection: "column" }}>
                            {proj.studentsInvolved.map((student: any, index: number) => (
                                <Col key={index}>{student}</Col>
                            ))}
                        </Col>

                    </Row>
                    <Button
                        className="student-view-button margin-right"
                        onClick={() => navigate('/form', { state: { proj } })}
                    >
                        {t('modifyData')}
                    </Button>
                    <Button
                        className="student-view-button"
                        onClick={() => handleDeleteProject()}
                    >
                        {t('deleteProj')}
                    </Button>
                </Col>
                <Col xs="12" lg="5" style={{ marginTop: "15%" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{t('changeStatus')}:</div>
                    <ChangeProjectStatus projectData={proj} />
                </Col>

                <hr className="hr-style" />

                <div style={{ fontWeight: "bold" }}>{t('projNotes')}</div>
                <NotesListing projectId={projectId} />

                <hr className="hr-style" />

                <div style={{ fontWeight: "bold" }}>{t('projDocs')}</div>
                <DocumentsListing projectId={projectId} />

                <hr className="hr-style" />

                <div style={{ fontWeight: "bold" }}>{t('studInvolved')}</div>
                <Row className="notes-listing">
                    <Col>
                        <div style={{ fontWeight: "bold" }}>{t('studInProj')}:</div>
                        {proj.studentsInvolved?.map((student: any, index: number) => (
                            <div key={index}>{student}</div>
                        ))}
                    </Col>
                    <Col >
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder={t('enterName')}
                                style={{ width: "300px", fontSize: "13px" }}
                                onChange={(e) => handleChange(e.target.value)}
                                value={studentName}
                            />
                        </Form>
                        <Button
                            className="student-view-button"
                            type='button'
                            onClick={() => handleAddStudent()}
                        >
                            {t('addStudent')}
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default StudentProjectDetails;