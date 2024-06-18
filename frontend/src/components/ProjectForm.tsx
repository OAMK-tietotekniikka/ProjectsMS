import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../interface/formData';  


interface ProjectFormProps {
    onSubmit: (formData: ProjectFormData, companyName: String) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();

    const [ companyName, setCompanyName ] = useState<string>(''); 
    const [ formData, setFormData ] = useState<ProjectFormData>({
        project_name: '',
        project_desc: '',
        teacher_id: 0,
        company_id: 0,
        project_status: 'pending',
        project_url: 'no url',
        start_date: null,
        end_date: null,
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const { project_name, start_date, project_desc } = formData;
        const isValid = project_name !== '' && companyName !== '' && start_date !== null && project_desc !== '';
        setValidated(isValid);
      }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value ? new Date(value) : null,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // call for select teacher function to get the teacher id
        //const teacherId = selectTeacher(companyName, formData.start_date);
        
        

        // add teacherId to the formData
        onSubmit(formData, companyName);
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
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="start_date" className="form-item">
                            <Form.Label>{t('startDate')}</Form.Label>
                            <Form.Control
                                type="date"
                                name="start_date"
                                value={formData.start_date ? formData.start_date.toISOString().split('T')[0] : ''}
                                onChange={handleDateChange}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="end_date" className="form-item">
                            <Form.Label>{t('dueDate')}</Form.Label>
                            <Form.Control
                                type="date"
                                name="end_date"
                                value={formData.end_date ? formData.end_date.toISOString().split('T')[0] : ''}
                                onChange={handleDateChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="project_desc" className="form-item" style={{paddingTop: '2%'}}>
                    <Form.Label>{t('projDesc')}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="project_desc"
                        value={formData.project_desc}
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