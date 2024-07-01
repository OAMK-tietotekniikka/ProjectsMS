import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../interface/formData';
import { addProject } from '../contexts/apiRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const AddNewProject: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleFormSubmit = async (formData: ProjectFormData, company_id: number, teacher_id: number) => {
        // add company_id to formData
        formData.company_id = company_id;
        formData.teacher_id = teacher_id;

        try {
            const response = await addProject(formData);

            if (response.statusCode === 201) {
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
