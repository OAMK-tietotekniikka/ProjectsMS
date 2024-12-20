import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useStudentsContext } from '../contexts/studentsContext';
import { useProjectsContext } from '../contexts/projectsContext';
import { useTeachersContext } from '../contexts/teachersContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const StudentDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { students, signedInStudent } = useStudentsContext();
    const { projects, studentProjects, fetchProjects } = useProjectsContext();
    const { teachers } = useTeachersContext();
    const { companies } = useCompaniesContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);
    
    const studentId = signedInStudent?.student_id || 0;
    
    const studentProjectsList = studentProjects?.filter(project => project.student_id === studentId) || [];
    const studentProjectsWithData = studentProjectsList?.map(project => {
        const projectData = projects?.find(proj => proj.project_id === project.project_id);
        const foundTeacher = teachers?.find(teacher => teacher.teacher_id === projectData?.teacher_id);
        return {
            ...project,
            project_name: projectData?.project_name || "No project name",
            project_desc: projectData?.project_desc || "No project description",
            project_status: projectData?.project_status || "No project status",
            teacher_name: foundTeacher ? `${foundTeacher.teacher_name}` : "no teacher",
            teacher_id: projectData?.teacher_id || null,
            company_id: projectData?.company_id || null,
            company_name: companies?.find(company => company.company_id === projectData?.company_id)?.company_name || "No company name",
            start_date: projectData?.start_date || "No start date",
            end_date: projectData?.end_date || "No end date",
            project_url: projectData?.project_url || "No project url",
            studentsInvolved: studentProjects?.filter(proj => proj.project_id === project.project_id).map(student => students.find(stud => stud.student_id === student.student_id)?.student_name) || "No students involved"
        }
    });

    return (
        <Container className='student-main-container'>
            <Col xs="12" lg="9">
                <Row >
                    {signedInStudent ?
                        <div>
                            <h4>{signedInStudent.student_name}</h4>
                            <div style={{ fontSize: "small" }}>{signedInStudent.email}</div>
                            <div style={{ fontSize: "small" }}>{signedInStudent.class_code ? signedInStudent.class_code.toUpperCase() : "no code"}</div>
                        </div>
                        : "No student data"}

                    {studentProjectsList.length > 0 ?
                        <>
                            <div style={{ margin: "4% 0%" }}>{t('projListBelow')}</div>
                            <hr style={{margin: "0"}}/>
                            <Row>
                                <Col className="heading-row"></Col>
                                <Col className="heading-row">{t('company')}</Col>
                                <Col className="heading-row">{t('startDate')}</Col>
                                <Col className="heading-row">{t('dueDate')}</Col>
                            </Row>

                            {studentProjectsWithData.map(proj => (
                                <Row
                                    className="data-row"
                                    key={proj.project_id}
                                    onClick={() => navigate(`/studentProject/${proj.project_id}`, { state: { proj } })}
                                >
                                    <Col className="data-item" style={{ color: "#5e5e5e", fontWeight: "bold" }}>{t('projectNo')} {proj.project_number}</Col>
                                    <Col className="data-item">{proj.company_name}</Col>
                                    <Col className="data-item">{String(proj.start_date).split('T')[0]}</Col>
                                    <Col className="data-item">{String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0]}</Col>
                                </Row>
                            ))}
                        </>
                        : <div className="second-heading" >{t('noProjects')}</div>}
                    <hr style={{ marginTop: "10px", marginBottom: "0px" }}/>
                </Row>
                <Row>
                    <Button href="/form" className='student-view-button'>{t('createProj')}</Button>
                </Row>
            </Col>
        </Container>
    );
};

export default StudentDashboard;


