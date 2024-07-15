import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../contexts/projectsContext';
import { useCompaniesContext } from '../contexts/companiesContext';
import { useStudentsContext } from '../contexts/studentsContext';
import { getStudyYear } from './GetStudyYear';

import SelectionDropdown from './SelectionDropdown';

const PastProjectsList: React.FC = () => {
    const { t } = useTranslation();
    const { projects, studentProjects } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [selectedData, setSelectedData] = React.useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByYear', 'selectByStudent'];

    const projectsForSignedInTeacher = projects?.filter(project => project.teacher_id === 1 && (project.project_status === 'completed')) || [];

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

    const projectsWithStudyYears = projectsWithStudents.map((project) => {
        const date = new Date(project.start_date);
        const studyYear = getStudyYear(date);
        return { ...project, study_year: studyYear };
    });


    const dataToDisplay = selectedData?.length > 0 ? selectedData : projectsWithStudyYears || [];

    return (
        <>
        <div>
            <SelectionDropdown
                data={projectsWithStudyYears}
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
                        <th>{t('started')}</th>
                        <th>{t('ended')}</th>
                        <th>{t('companyName')}</th>
                        <th>{t('projectNo')}</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((proj) => (
                        <tr key={proj.project_id} style={{ fontSize: "13px" }}>
                            <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{fontWeight: "bold"}}>
                                    {proj.name}
                                </div>
                                <div>
                                    {proj.student_email}
                                </div>
                                <div>
                                    {(proj.class_code).toUpperCase()}
                                </div>
                            </td>
                            <td>{String(proj.start_date).split('T')[0]}</td>
                            <td>{String(proj.end_date).split('T')[0]}</td>
                            <td>{proj.company_name}</td>
                            <td>{proj.project_number}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </>
    );

};

export default PastProjectsList;