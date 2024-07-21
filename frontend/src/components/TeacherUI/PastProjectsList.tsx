import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useStudentsContext } from '../../contexts/studentsContext';
import { getStudyYear } from '../GetStudyYear';
import { Project } from '../../interface/project';
import SelectionDropdown from './SelectionDropdown';


interface PastProjectsListProps {
    teacherId: number;
}

const PastProjectsList: React.FC<PastProjectsListProps> = ({ teacherId }) => {
    const { t } = useTranslation();
    const { projects, studentProjects } = useProjectsContext();
    const { companies } = useCompaniesContext();
    const { students } = useStudentsContext();
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByClass', 'selectByYear', 'selectByName'];

    const projectsForSignedInTeacher = projects?.filter(project => project.teacher_id === teacherId && (project.project_status === 'completed')) || [];

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
        const date = new Date(project.end_date);
        const studyYear = getStudyYear(date);
        return { ...project, study_year: studyYear };
    });

    //sort by project end_date
    projectsWithStudyYears.sort((a, b) => {
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
    }
    );

    const dataToDisplay = selectedData?.length > 0 ? selectedData : projectsWithStudyYears || [];

    const groupedData = dataToDisplay.reduce((groups, item) => {
        const studyYear = item.study_year;
        if (!groups[studyYear]) {
            groups[studyYear] = [];
        }
        groups[studyYear].push(item);
        return groups;
    }, {});

    const handleRowClick = (project: Project) => {
        console.log('Project selected:', project);
        // add code to navigate to project details page
    };

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
                            <th>{t('studyGroup')}</th>
                            <th>{t('started')}</th>
                            <th>{t('ended')}</th>
                            <th>{t('companyName')}</th>
                            <th>{t('projectNo')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedData).map((studyYear) => (
                            <React.Fragment key={studyYear}>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }}>
                                        {studyYear}
                                    </td>
                                </tr>
                                {groupedData[studyYear].map((proj) => (
                                    <tr key={proj.project_id} style={{ fontSize: "13px" }} onClick={() => handleRowClick(proj)}>
                                        <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                            <div style={{ fontWeight: "bold" }}>
                                                {proj.name}
                                            </div>
                                            <div>
                                                {proj.student_email}
                                            </div>
                                        </td>
                                        <td>{proj.class_code.toUpperCase()}</td>
                                        <td>{String(proj.start_date).split('T')[0]}</td>
                                        <td>{String(proj.end_date).split('T')[0]}</td>
                                        <td>{proj.company_name}</td>
                                        <td>{proj.project_number}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default PastProjectsList;