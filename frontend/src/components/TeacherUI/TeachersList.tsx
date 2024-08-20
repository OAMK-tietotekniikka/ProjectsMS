import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import SelectionDropdown from './SelectionDropdown';
import { useNavigate } from 'react-router-dom';
import { getStudyYear } from '../GetStudyYear';

const TeachersList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { teachers, resources } = useTeachersContext();
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByName'];
    const currStudyYear = getStudyYear(new Date());


    // Create a map of teacher IDs to resources
    const resourcesByTeacherId = resources?.reduce((acc, resource) => {
        if (!acc[resource.teacher_id]) {
            acc[resource.teacher_id] = [];
        }
        acc[resource.teacher_id].push(resource);
        return acc;
    }, {} as Record<string, any[]>);

    // Build the teachersWithResources array
    const teachersWithResources = teachers?.map(teacher => {
        const teacherResources = resourcesByTeacherId?.[teacher.teacher_id] || [];
        const teacherName = `${teacher.first_name ?? ''} ${teacher.last_name ?? ''}`.trim();
        if (teacherResources.length > 0) {
            return teacherResources.map(resource => ({
                ...resource,
                name: teacherName,
                email: teacher.email || 'Unknown Email'
            }));
        } else {
            return {
                teacher_id: teacher.teacher_id,
                name: teacherName,
                email: teacher.email || 'Unknown Email',
                total_resources: 0,
                used_resources: 0,
                study_year: 'N/A'
            };
        }
    }).flat();
    
    teachersWithResources?.sort((a, b) => {
        const yearA = a.study_year === 'N/A' ? 0 : parseInt(a.study_year.split('-')[0], 10);
        const yearB = b.study_year === 'N/A' ? 0 : parseInt(b.study_year.split('-')[0], 10);
        return yearB - yearA;
    });

    const dataToDisplay = selectedData?.length > 0 ? selectedData : teachersWithResources || [];

    const handleRowClick = (res: any) => {
        const teacherId = res.teacher_id;
        navigate(`/modifyTeacher/${teacherId}`);
    };

    return (
        <>
            <div>
                <SelectionDropdown
                    data={teachersWithResources}
                    options={selectionOptions}
                    toggle={'selectTeachers'}
                    setSelectedData={setSelectedData}
                />
            </div>
            <div className="projects-table">
                <Table hover size='sm' className="table-custom">
                    <thead>
                        <tr style={{ fontSize: "13px" }}>
                            <th></th>
                            <th>{t('totRes')} {currStudyYear}:</th>
                            <th>{t('usedRes')} {currStudyYear}:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((teacher, index) => (
                            teacher.study_year === currStudyYear || teacher.study_year === 'N/A' ?
                                <tr key={index} style={{ fontSize: "13px" }} onClick={() => handleRowClick(teacher)}>
                                    <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ fontWeight: "bold" }}>
                                            {teacher.name}
                                        </div>
                                        <div>
                                            {teacher.email}
                                        </div>
                                    </td>
                                    <td>{teacher.total_resources}</td>
                                    <td>{teacher.used_resources}</td>
                                </tr> : null
                        ))}
                    </tbody>
                </Table>
            </div>
        </>

    )

};

export default TeachersList;


