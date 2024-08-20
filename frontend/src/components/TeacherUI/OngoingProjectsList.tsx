import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../interface/project';
import { ProjectFormData } from '../../interface/formData';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import checkboxImage from '../../assets/checkbox.svg';
import squareImage from '../../assets/square.svg';
import SelectionDropdown from './SelectionDropdown';
import { useTeachersContext } from '../../contexts/teachersContext';


interface OngoingProjectsListProps {
    teacherId: number;
}

const OngoingProjectsList: React.FC<OngoingProjectsListProps> = ({ teacherId }) => {
    const { t } = useTranslation();
    const { projects, studentProjects, modifyProject } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const { teachers } = useTeachersContext();
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByName'];
    const [modifiedProjectData, setModifiedProjectData] = useState<ProjectFormData | null>(null);
    const [show, setShow] = useState(false);
    const [studentName, setStudentName] = useState('');
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const projectsForSignedInTeacher = projects?.filter(project => project.teacher_id === teacherId && (project.project_status === 'pending' || project.project_status === 'ongoing')) || [];

    // add company_name to items in projectsForSignedInTeacher array using company_id and companies array
    const projectsWithCompanyNames = projectsForSignedInTeacher.map((project) => {
        const company = companies?.find((company) => company.company_id === project.company_id);
        return { ...project, company_name: company?.company_name || 'Unknown Company' };
    });

    // Add projectNo and student name to items in projectsWithCompanyNames array using student_id and studentProjects array
    const projectsWithStudents = projectsWithCompanyNames.map((project) => {
        const studentProject = studentProjects?.find((studentProject) => studentProject.project_id === project.project_id);
        const student = students?.find((student) => student.student_id === studentProject?.student_id);
        const studentName = student ? `${student.first_name ?? ''} ${student.last_name ?? ''}`.trim() : 'Unknown';
        return {
            ...project,
            project_number: studentProject?.project_number || 'Unknown Project Number',
            name: studentName,
            student_email: student?.email || 'Unknown Email',
            class_code: student?.class_code || 'Unknown Class Code',
            studentsInvolved: studentProjects?.filter(proj => proj.project_id === project.project_id).map(student => students.find(stud => stud.student_id === student.student_id)?.first_name + ' ' + students.find(stud => stud.student_id === student.student_id)?.last_name) || "No students involved",
            teacher_name: teachers?.find(teacher => teacher.teacher_id === project.teacher_id)?.first_name + ' ' + teachers.find(teacher => teacher.teacher_id === project.teacher_id)?.last_name || "No teacher name",
        };
    });
    const dataToDisplay = selectedData?.length > 0 ? selectedData : projectsWithStudents || [];

    const handleChecked = (project: any) => {
        const currentDate = new Date();

        const newProjectData = {
            project_name: project.project_name,
            project_desc: project.project_desc,
            teacher_id: project.teacher_id,
            company_id: project.company_id,
            project_status: 'completed',
            project_url: project.project_url,
            start_date: project.start_date,
            end_date: currentDate,
        }
        setModifiedProjectData(newProjectData);
        setStudentName(project.name);
        setShow(true);
        //
        setSelectedProjectId(project.project_id);
    };

    const handleConfirm = () => {
        if (modifiedProjectData) {
            modifyProject(modifiedProjectData, selectedProjectId);
            setModifiedProjectData(null);
            setSelectedProjectId(null);
            setShow(false);
        }
    };

    return (
        <>
            <div>
                <SelectionDropdown
                    data={projectsWithStudents}
                    options={selectionOptions}
                    toggle={'selectStudents'}
                    setSelectedData={setSelectedData}
                />
            </div>
            <div className="projects-table">
                <Table hover size='sm' className="table-custom">
                    <thead>
                        <tr style={{ fontSize: "13px" }}>
                            <th></th>
                            <th>{t('studyGroup')}</th>
                            <th>{t('started')}</th>
                            <th>{t('ended')}</th>
                            <th>{t('company')}</th>
                            <th>{t('projectNo')}</th>
                            <th>{t('setEnded')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((proj) => (
                            <tr
                                key={proj.project_id}
                                style={{ fontSize: "13px" }}
                                onClick={() => navigate(`/studentProject/${proj.project_id}`, { state: { proj } })}
                            >
                                <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontWeight: "bold" }}>
                                        {proj.name}
                                    </div>
                                    <div>
                                        {proj.student_email}
                                    </div>
                                </td>
                                <td>{(proj.class_code).toUpperCase()}</td>
                                <td>{String(proj.start_date).split('T')[0]}</td>
                                <td>{String(proj.end_date).split('-')[0] === "1970" ? "not set" : String(proj.end_date).split('T')[0]}</td>
                                <td>{proj.company_name}</td>
                                <td>{proj.project_number}</td>
                                <td>
                                    <button
                                        style={{ height: "20px", width: "20px", marginLeft: "20% ", padding: "0", border: "none" }}
                                        onClick={(e) => { e.stopPropagation(); handleChecked(proj) }}
                                    >
                                        <img src={selectedProjectId === proj.project_id ? checkboxImage : squareImage} alt="tick" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={() => { handleClose(); setSelectedProjectId(null) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('projCloseModalTitle')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h6>{t('modifiedData')}:</h6>
                        <div>{t('studName')}: {studentName}</div>
                        <div>{t('projName')}: {modifiedProjectData?.project_name}</div>
                        <div>{t('dueDate')}: {modifiedProjectData?.end_date.toISOString().split('T')[0]}</div>
                        <div>{t('status')}: {modifiedProjectData?.project_status}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose(); setSelectedProjectId(null) }}>
                        {t('goBack')}
                    </Button>
                    <Button style={{ backgroundColor: "#F7921E" }} onClick={() => handleConfirm()}>
                        {t('yesSave')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );

};

export default OngoingProjectsList;