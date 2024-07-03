import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../interface/formData';
import { addProject, sendEmailNotification } from '../contexts/apiRequests';
import { useTeachersContext } from '../contexts/teachersContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const AddNewProject: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { teachers } = useTeachersContext();
    
    const handleFormSubmit = async (formData: ProjectFormData, companyId: number, teacherId: number, companyName: String) => {
        // add company_id and teacher_id to formData
        formData.company_id = companyId;
        formData.teacher_id = teacherId;
        const formattedStartDate = new Date(formData.start_date).toISOString().split('T')[0];
        
        const student = 'Student Name'; // actual student name can be obtained from the login data??
        const subject = 'A new Company Oriented Project supervision.';
        const text =
            `You have been assigned as a supervisor to a new Company Oriented Project with the following details:\n
            Student Name: ${student}
            Project Name: ${formData.project_name}
            Company: ${companyName}
            Start Date: ${formattedStartDate}\n
            Please login to the projects management system to view the project details.`;

        try {
            const response = await addProject(formData);
            if (response.statusCode === 201) {
                const selectedTeacher = teachers.find((teacher) => teacher.teacher_id === teacherId);
                
                if (selectedTeacher) {
                    const emailResponse = await sendEmailNotification(
                        selectedTeacher.email, // when testing, replace with some actual hardcoded email address
                        subject,
                        text
                        );
                    if (emailResponse.status === 200) {
                        alert(t('emailSent'));
                    } else {
                        alert(t('emailNotSent'));
                    }
                }
                alert(t('projCreated'));
                navigate('/');
            } else {
                alert(t('projNotCreated'));
            }
        } catch (error) {
            console.error("Failed to add project:", error);
            alert(t('projNotCreated'));
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={10} md={8} lg={6}>
                    <h4 className='main-heading'>{t('createProj')}</h4>
                    <div className='instruction '>
                        <p>{t('projInstruction')}</p>
                    </div>
                    <ProjectForm onSubmit={handleFormSubmit} />
                </Col>
            </Row>
        </Container>
    );
};

export default AddNewProject;
