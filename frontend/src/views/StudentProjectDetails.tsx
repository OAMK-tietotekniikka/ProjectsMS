import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import DocumentsListing from "../components/StudentUI/DocumentsListing";
import NotesListing from "../components/StudentUI/NotesListing";
import ChangeProjectStatus from "../components/StudentUI/ChangeProjectStatus";
import { useProjectsContext } from "../contexts/projectsContext";
//import { deleteProjectById } from "../contexts/apiRequests/projectsApiRequests";
//import { deleteProjectNoteById } from "../contexts/apiRequests/projectsApiRequests";


const StudentProjectDetails = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { proj } = location.state || {};
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id);
    const [studentName, setStudentName] = useState<string>("");
    const navigate = useNavigate();
    const { deleteProject, projects, setProjects } = useProjectsContext();
    const user = localStorage.getItem("user")

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

    // const handleDeleteProject = async () => {
    //     const isConfirmed = window.confirm("Are you sure you want to delete this project?");
    //     if (isConfirmed) {
    //         await deleteProjectById(projectId, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    //         setProjects(projects.filter(project => project.project_id !== projectId));
    //         navigate('/student');
    //     }
    // };

    const handleDeleteProject = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this project?");
        if (isConfirmed) {
            const authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
            deleteProject(projectId, authHeader); // Functionality to delete project will be added here});
            setProjects(projects.filter(project => project.project_id !== projectId));
            navigate('/teacher');
        }
    }


    return (
        <Container className="student-main-container">
            <Row className="student-main-row">
                <Col xs="12" lg="7">
                    <h4>{t('projectNo')} {proj.project_number}</h4>
                    <h6>{proj.project_name}</h6>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ fontWeight: "bold" }}>{t('projDesc')} :</div>
                        <div>{proj.project_desc}</div>
                    </div>
                    <Row>
                        <Col className="grey-text">{t('status')}</Col>
                        <Col>{t(proj.project_status)}</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('company')}</Col>
                        <Col>{proj.company_name}</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('startDate')}</Col>
                        <Col>{String(proj.start_date).split('T')[0]}</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('dueDate')}</Col>
                        <Col>{String(proj.end_date).split('-')[0] === "1970" ? t('dateNotSet') : String(proj.end_date).split('T')[0]}</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('url')}</Col>
                        <Col>{proj.project_url ? proj.project_url : t('noUrl') }</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('supervisor')}</Col>
                        <Col>{proj.teacher_name === "no teacher" ? t('noTeacher') : proj.teacher_name}</Col>
                    </Row>
                    <Row>
                        <Col className="grey-text">{t('studInvolved')}</Col>
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
                    {user === "teacher" ?
                        <Button
                            className="student-view-button"
                            onClick={() => handleDeleteProject()}
                        >
                            {t('deleteProj')}
                        </Button>
                        : null}

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

                {user === "student" &&
                    <>
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
                                <Form.Label style={{ fontWeight: "bold" }}>{t('addNewStudent')}</Form.Label>
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
                    </>
                }
            </Row>
        </Container>
    );
};

export default StudentProjectDetails;