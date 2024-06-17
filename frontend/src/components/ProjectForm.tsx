import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../interface/formData';    


interface ProjectFormProps {
    onSubmit: (formData: ProjectFormData) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<ProjectFormData>({
        project_name: '',
        companyName: '',
        startDate: '',
        dueDate: '',
        project_description: ''
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const { project_name, companyName, startDate, project_description } = formData;
        const isValid = project_name !== '' && companyName !== '' && startDate !== '' && project_description !== '';
        setValidated(isValid);
      }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="project_name" className="form-item">
                    <Form.Label>{t('projName')}</Form.Label>
                    <Form.Control
                        type="text"
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="companyName" className="form-item">
                    <Form.Label>{t('company')}</Form.Label>
                    <Form.Control
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="startDate" className="form-item">
                            <Form.Label>{t('startDate')}</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="dueDate" className="form-item">
                            <Form.Label>{t('dueDate')}</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="project_description" className="form-item" style={{paddingTop: '2%'}}>
                    <Form.Label>{t('projDesc')}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="project_description"
                        value={formData.project_description}
                        onChange={handleChange}
                        placeholder={t('projDescPlaceholder')}
                        required
                    />
                </Form.Group>

                <div style={{paddingTop: '2%'}}>
                    <p>{t('obligatory')}</p>
                </div>

                <Button variant="primary" type="submit" className="submit-button" disabled={!validated}>
                    {t('createPrjButton')}
                </Button>
            </Form>
        </Container>

    )
}

export default ProjectForm;