import React from 'react';
import { Table } from 'react-bootstrap';
import { Project } from '../interface/project';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../contexts/projectsContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useStudentsContext } from '../contexts/studentsContext';
import checkboxImage from '../assets/checkbox.svg';
import squareImage from '../assets/square.svg';
import SelectionDropdown from './SelectionDropdown';


const OngoingProjectsList: React.FC = () => {
    const { t } = useTranslation();
    const { projects, studentProjects } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [clickedProjectId, setClickedProjectId] = React.useState<number | null>(null);
    const [selectedData, setSelectedData] = React.useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByStudent'];

    const projectsForSignedInTeacher = projects?.filter(project => project.teacher_id === 1 && (project.project_status === 'pending' || project.project_status === 'ongoing')) || [];

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
            class_code: student?.class_code || 'Unknown Class Code'
        };
    });

    const dataToDisplay = selectedData?.length > 0 ? selectedData : projectsWithStudents || [];
    
    const handleChecked = (projectId: number) => {
        // This functionality is not implemented yet
        setClickedProjectId(projectId);
        // add code to set project status to 'ended' in the database

    };

    const handleRowClick = (project: Project) => {
        console.log('Project clicked:', project);
        // add code to navigate to project details page
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
                            <th>{t('companyName')}</th>
                            <th>{t('projectNo')}</th>
                            <th>{t('setEnded')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((proj) => (
                            <tr key={proj.project_id} style={{ fontSize: "13px" }} onClick={() => handleRowClick(proj)}>
                                <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{fontWeight: "bold"}}>
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
                                <td >
                                    <button
                                        style={{ height: "20px", width: "20px", marginLeft: "20% ", padding: "0", border: "none" }}
                                        onClick={(e) => { e.stopPropagation(); handleChecked(proj.project_id) }}
                                    >
                                        <img src={clickedProjectId === proj.project_id ? checkboxImage : squareImage} alt="tick" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>

    );

};

export default OngoingProjectsList;