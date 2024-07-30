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
    
    const studentId = signedInStudent.student_id || null;
    const studentProjectsList = studentProjects?.filter(project => project.student_id === studentId) || [];
      
    const studentProjectsWithData = studentProjectsList?.map(project => {
        const projectData = projects?.find(proj => proj.project_id === project.project_id);
        return {
            ...project,
            project_name: projectData?.project_name || "No project name",
            project_description: projectData?.project_desc || "No project description",
            project_status: projectData?.project_status || "No project status",
            teacher_name: teachers?.find(teacher => teacher.teacher_id === projectData?.teacher_id)?.first_name + ' ' + teachers.find(teacher => teacher.teacher_id === projectData?.teacher_id)?.last_name || "No teacher name",
            teacher_id: projectData?.teacher_id || "No teacher id",
            company_id: projectData?.company_id || "No company id",
            company_name: companies?.find(company => company.company_id === projectData?.company_id)?.company_name || "No company name",
            start_date: projectData?.start_date || "No start date",
            end_date: projectData?.end_date || "No end date",
            project_url: projectData?.project_url || "No project url",
            studentsInvolved: studentProjects?.filter(proj => proj.project_id === project.project_id).map(student => students.find(stud => stud.student_id === student.student_id)?.first_name + ' ' + students.find(stud => stud.student_id === student.student_id)?.last_name) || "No students involved"
        }
    });

    return (
        <Container className='student-main-container'>
            <Row className="student-main-row">
                <Col xs="12" lg="8">
                    {signedInStudent ?
                        <div>
                            <h4>{signedInStudent.first_name} {signedInStudent.last_name}</h4>
                            <div style={{ fontSize: "small" }}>{signedInStudent.email}</div>
                            <div style={{ fontSize: "small" }}>{signedInStudent.class_code.toUpperCase()}</div>
                        </div>
                        : "No student data"}

                    {studentProjectsList.length > 0 ?
                        <>
                            <div style={{ marginTop: "4%" }}>{t('projListBelow')}</div>
                            <hr />
                            <Row>
                                <Col className="heading-row"></Col>
                                <Col className="heading-row">{t('company')}</Col>
                                <Col className="heading-row">{t('startDate')}</Col>
                                <Col className="heading-row">{t('dueDate')}</Col>
                            </Row>

                            {studentProjectsWithData.map(proj => (
                                <Row className="data-row" key={proj.project_id} onClick={() => navigate(`/studentProject/${proj.project_id}`, { state: { proj } })}>
                                    <Col className="data-item" style={{color: "#5e5e5e", fontWeight: "bold"}}>{t('projectNo')} {proj.project_number}</Col>
                                    <Col className="data-item">{proj.company_name}</Col>
                                    <Col className="data-item">{String(proj.start_date).split('T')[0]}</Col>
                                    <Col className="data-item">{String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0]}</Col>
                                    
                                </Row>
                            ))}
                        </>
                        : <div className="second-heading" >{t('noProjects')}</div>}
                <hr />
                </Col>
                <Col xs="12" lg="4" style={{ marginTop: "25%" }}>
                    <Button href="/form" className='student-view-button'>{t('createProj')}</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default StudentDashboard;


