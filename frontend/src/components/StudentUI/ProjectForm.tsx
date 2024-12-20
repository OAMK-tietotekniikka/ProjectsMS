import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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

    const [localProj, setLocalProj] = useState<any>(proj) || null;
    const [companyName, setCompanyName] = useState<string>(localProj?.company_name || '');
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
    // proj is stored in localProj to avoid losing the data when the page is refreshed
    useEffect(() => {
        if (proj) {
            setLocalProj(proj);
            setCompanyName(proj.company_name || '');
        }
    }, [proj]);

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

        if (selectedTeacher !== null && selectedTeacher.teacher_id && localProj) {
            const student = students?.find((student) => student.email === localProj.student_email) || null;
            const selectedTeacherResource = resources.find(res => res.teacher_id === selectedTeacher.teacher_id && res.study_year === currStudyYear);
            const resourceAdded = {
                teacher_id: selectedTeacher.teacher_id,
                total_resources: selectedTeacherResource.total_resources,
                used_resources: selectedTeacherResource.used_resources + 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(selectedTeacherResource.resource_id, resourceAdded);

            const currentTeacherResource = resources.find(res => res.teacher_id === localProj.teacher_id && res.study_year === currStudyYear);
            const resourceRemoved = {
                teacher_id: localProj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currStudyYear,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);

            try {
                const emailResponse = await sendEmail(
                    selectedTeacher.email,
                    student.student_name,
                    formData.project_name,
                    localProj.company_name,
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

        if (selectedTeacher === null && localProj) {
            const currentTeacherResource = resources.find(res => res.teacher_id === localProj.teacher_id && res.study_year === currStudyYear);
            const resourceRemoved = {
                teacher_id: localProj.teacher_id,
                total_resources: currentTeacherResource.total_resources,
                used_resources: currentTeacherResource.used_resources - 1,
                study_year: currentTeacherResource.study_year,
            };
            updateTeacherResource(currentTeacherResource.resource_id, resourceRemoved);
            console.log('Resource removed from current teacher');

        }

        if (localProj && classCode !== localProj.class_code && user === "teacher") {
            const student = students?.find((student) => student.email === localProj.student_email) || null;
            try {
                const modifiedStudent = {
                    student_name: student.student_name,
                    email: student.email,
                    class_code: classCode,
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
                        signedInStudent?.student_name,
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
            if (user === "student" && localProj) {
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: localProj.teacher_id,
                    company_id: companyId,
                    project_status: localProj.project_status,
                    project_url: localProj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                await modifyProject(modifiedFormData, localProj.project_id);
                navigate('/student', { replace: true })

            } else if (user === "teacher" && localProj) {
                const teacherId = selectedTeacher === null ? null : (selectedTeacher.teacher_id ? selectedTeacher.teacher_id : formData.teacher_id);
                console.log(`Teacher_id from project form after teacher modification: ${teacherId}`)
                const modifiedFormData = {
                    project_name: formData.project_name,
                    project_desc: formData.project_desc,
                    teacher_id: teacherId,
                    company_id: localProj.company_id,
                    project_status: localProj.project_status,
                    project_url: localProj.project_url,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                };
                modifyProject(modifiedFormData, localProj.project_id);
                navigate('/teacher', { replace: true })
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
            <h4 className='main-heading'>{localProj ? t('modifyData') : t('createProj')}</h4>
            <div className='instruction '>
                <p>{localProj ? "" : t('projInstruction')}</p>
            </div>
            <Container>
                {user === "teacher" &&
                    <>
                        <h5 style={{ marginBottom: "20px" }}>{formData.project_name}</h5>
                        <div>
                            <h6>{localProj.name}</h6>
                            <div style={{ fontSize: "small", marginBottom: "20px" }}>{localProj.student_email}</div>
                        </div>
                        <div>
                            <h6>{t('projDesc')}:</h6>
                            <div style={{ fontSize: "small", marginBottom: "20px" }}>{localProj.project_desc}</div>
                        </div>
                        <div className='modify-project-row'>
                            <Row >
                                <Col xs="5" style={{ fontWeight: "bold" }}><h6>{t('supervisor')}</h6></Col>
                                <Col xs="5" style={{ padding: "0%" }}>{localProj.teacher_name}</Col>
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
                    <div>{t('dropdownSelectCompany')}</div>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                            {t('select')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {companies?.map((item: any, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => setCompanyName(item.company_name)}
                                    className={`dropdown-item-${index}`}
                                    href={"#/action-${index}"}
                                >
                                    {item.company_name}
                                </Dropdown.Item>
                            )) || <Dropdown.Item>{t('noComp')}</Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>
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
                        {localProj ? t('saveModify') : t('createPrjButton')}
                    </Button>
                </Form>
            </Container>

        </>
    )
}

export default ProjectForm;