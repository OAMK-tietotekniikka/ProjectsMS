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
        projectName: '',
        companyName: '',
        startDate: '',
        dueDate: '',
        projectDescription: ''
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const { projectName, companyName, startDate, projectDescription } = formData;
        const isValid = projectName !== '' && companyName !== '' && startDate !== '' && projectDescription !== '';
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
                <Form.Group controlId="projectName" className="form-item">
                    <Form.Label>{t('projName')}</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectName"
                        value={formData.projectName}
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

                <Form.Group controlId="projectDescription" className="form-item" style={{paddingTop: '2%'}}>
                    <Form.Label>{t('projDesc')}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="projectDescription"
                        value={formData.projectDescription}
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