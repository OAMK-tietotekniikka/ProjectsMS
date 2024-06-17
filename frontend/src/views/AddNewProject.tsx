import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectForm from '../components/ProjectForm';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../interface/formData';
import { addProject } from '../contexts/apiRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const AddNewProject: React.FC = () => {
    const { t } = useTranslation();

    const handleFormSubmit = async (formData: ProjectFormData, companyName: String) => {
        console.log(`from AddNewProject: ${JSON.stringify(formData)}`);
        const response = await addProject(formData);

        if (response.status === 201) {
            alert(t('projCreated'));
        } else {
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
