import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ProjectFormData } from '../../interface/formData';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useUserContext } from '../../contexts/userContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import { getCompanyId } from '../TeacherUI/GetCompanyId';
import { selectTeacher } from '../TeacherUI/SelectTeacher';
import { useLocation, useNavigate } from 'react-router-dom';
import ChangeSupervTeacher from '../TeacherUI/ChangeSupervTeacher';
import { noResourcesEmailToTeachers, sendEmail } from '../SendEmail';
import { getStudyYear } from '../GetStudyYear'
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProjectFormProps {
    onSubmit: (formData: ProjectFormData, company_id: number, teacher_id: number, companyName: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { companies, addCompany } = useCompaniesContext();
    const { resources, updateTeacherResource, teachers } = useTeachersContext();
    const { modifyStudent, students, signedInStudent } = useStudentsContext();
    const { user } = useUserContext();
    const { modifyProject } = useProjectsContext();
    const { proj } = location.state || {};
    const currStudyYear = getStudyYear(new Date());

    const [companyName, setCompanyName] = useState<string>(proj?.company_name || '');
    const [classCode, setClassCode] = useState<string>(proj?.class_code || '');
    const [selectedTeacher, setSelectedTeacher] = useState<any>({});
    const [validated, setValidated] = useState(false);
    const [showTeacherChange, setShowTeacherChange] = useState(false);
    const [formData, setFormData] = useState<ProjectFormData>({
        project_name: proj?.project_name || '',
        project_desc: proj?.project_desc || '',
        teacher_id: proj?.teacher_id || 0,
        company_id: 0,
        project_status: 'pending',
        project_url: 'no url',
        start_date: proj?.start_date ? new Date(proj.start_date) : null,
        end_date: proj?.end_date ? new Date(proj.end_date) : null,
    });

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

    const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setClassCode(value);
    };

    useEffect(() => {
        const { project_name, start_date, project_desc } = formData;
        const isValid = project_name !== '' && companyName !== '' && start_date !== null && project_desc !== '';
        setValidated(isValid);
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedTeacher !== null && selectedTeacher.teacher_id && proj) {
            const student = students?.find((student) => student.email === proj.student_email) || null;
            const selectedTeacherResource = resources.find(res => res.teacher_id === selectedTeacher.teacher_id && res.study_year === currStudyYear);
            const resourceAdded = {
                teacher_id: selectedTeacher.teacher_id,
                total_resources: selectedTeacherResource.total_resources,
                used_resources: selectedTeacherResource.used_resources + 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(selectedTeacherResource.resource_id, resourceAdded);

            const currentTeacherResource = resources.find(res => res.teacher_id === proj.teacher_id && res.study_year === currStudyYear);
            const resourceRemoved = {
                teacher_id: proj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);

            try {
                const studentName = `${student.first_name} ${student.last_name}`
                const emailResponse = await sendEmail(
                    selectedTeacher.email,
                    studentName,
                    formData.project_name,
                    proj.company_name,
                    formData.start_date.toISOString().split('T')[0],
                );
                if (emailResponse) {
                    console.log('Email sent successfully');
                } else {
                    alert(t('emailNotSent'));
                }
            } catch (error) {
                console.error('Failed to send email:', error);
            }
        }

        if (selectedTeacher === null && proj) {
            console.log(proj)
            console.log(selectedTeacher)
            const currentTeacherResource = resources.find(res => res.teacher_id === proj.teacher_id && res.study_year === currStudyYear);
            console.log(currentTeacherResource)
            const resourceRemoved = {
                teacher_id: proj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currentTeacherResource.study_year,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);
            console.log('Resource removed from current teacher');

        }

        if (proj && classCode !== proj.class_code && user === "teacher") {
            const student = students?.find((student) => student.email === proj.student_email) || null;
            try {
                const modifiedStudent = {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    email: student.email,
                    class_code: classCode,
                    password: student.password,
                };
                modifyStudent(modifiedStudent, student.student_id);
            }
            catch (error) {
                console.error("Failed to modify student:", error);
            }
        }

        try {
            const teacherEmails = teachers.map(teacher => teacher.email);
            let teacherId = 0;
            const companyId = await getCompanyId(companyName, companies, addCompany);
            const resource = await selectTeacher(companyName, formData.start_date, resources);
            resource === null ? teacherId = null : teacherId = resource.teacher_id;

            if (resource === null) {
                try {
                    const emailResponse = await noResourcesEmailToTeachers(
                        teacherEmails,
                        `${signedInStudent?.first_name} ${signedInStudent?.last_name}`,
                        signedInStudent.class_code,
                        formData.start_date.toISOString().split('T')[0],
                    );
                    if (emailResponse) {
                        console.log('Email sent successfully');
                    } else {
                        console.log('Email not sent');
                    }
                }
                catch (error) {
                    console.error("Failed to send email:", error);
                }
            }

            if (user === "student" && proj) {
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: proj.teacher_id,
                    company_id: companyId,
                    project_status: proj.project_status,
                    project_url: proj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, proj.project_id);
                navigate('/student')

            } else if (user === "teacher" && proj) {
                const teacherId = selectedTeacher === null ? null : (selectedTeacher.teacher_id ? selectedTeacher.teacher_id : formData.teacher_id);
                console.log(`Teacher_id from project form after teacher modification: ${teacherId}`)
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: teacherId,
                    company_id: proj.company_id,
                    project_status: proj.project_status,
                    project_url: proj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, proj.project_id);
                navigate('/teacher')
            } else {
                if (resource !== null) {
                    updateTeacherResource(resource.resource_id, { ...resource, used_resources: resource.used_resources + 1 });
                }
                onSubmit(formData, companyId, teacherId, companyName);
            }
        } catch (error) {
            console.error("Failed to submit form:", error);
        }
    };

    return (
        <>
            <h4 className='main-heading'>{proj ? t('modifyData') : t('createProj')}</h4>
            <div className='instruction '>
                <p>{proj ? "" : t('projInstruction')}</p>
            </div>
            <Container>
                {user === "teacher" &&
                    <>
                        <h5 style={{ marginBottom: "20px" }}>{formData.project_name}</h5>
                        <div>
                            <h6>{proj.name}</h6>
                            <div style={{ fontSize: "small", marginBottom: "20px" }}>{proj.student_email}</div>
                        </div>
                        <div>
                            <h6>{t('projDesc')}:</h6>
                            <div style={{ fontSize: "small", marginBottom: "20px" }}>{proj.project_desc}</div>
                        </div>
                        <div className='modify-project-row'>
                            <Row >
                                <Col xs="5" style={{ fontWeight: "bold" }}><h6>{t('supervisor')}</h6></Col>
                                <Col xs="5" style={{ padding: "0%" }}>{proj.teacher_name}</Col>
                                <Col xs="2" style={{ padding: "0%" }}>
                                    <Button className='modify-project-button'
                                        onClick={() => setShowTeacherChange(true)}
                                    >
                                        {t('change')}
                                    </Button>
                                </Col>

                            </Row>
                            {showTeacherChange &&
                                <Row>
                                    <ChangeSupervTeacher setSelectedTeacher={(teacher) => setSelectedTeacher(teacher)} selectedTeacher={selectedTeacher} />
                                </Row>
                            }
                        </div>
                    </>
                }
                {user === "teacher" &&
                    <Form.Group controlId="classCode" className="form-item">
                        <Form.Label>{t('studyGroup')} *</Form.Label>
                        <Form.Control
                            type="text"
                            name="class_code"
                            value={classCode.toUpperCase()}
                            onChange={handleClassChange}
                            required
                        />
                    </Form.Group>
                }
                <Form onSubmit={handleSubmit}>
                    {user === "student" &&
                        <Form.Group controlId="project_name" className="form-item">
                            <Form.Label>{t('projName')} *</Form.Label>
                            <Form.Control
                                type="text"
                                name="project_name"
                                value={formData.project_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    }
                    {user === "student" &&
                        <Form.Group controlId="companyName" className="form-item">
                            <Form.Label>{t('companyName')} *</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    }
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="start_date" className="form-item">
                                <Form.Label>{t('startDate')} *</Form.Label>
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
                    {user === "student" &&
                        <Form.Group controlId="project_desc" className="form-item" style={{ paddingTop: '2%' }}>
                            <Form.Label>{t('projDesc')} *</Form.Label>
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
                    }

                    <div style={{ paddingTop: '2%' }}>
                        <p>{t('obligatory')}</p>
                    </div>

                    <Button variant="primary" type="submit" className="submit-button" disabled={!validated}>
                        {proj ? t('saveModify') : t('createPrjButton')}
                    </Button>
                </Form>
            </Container>

        </>
    )
}

export default ProjectForm;