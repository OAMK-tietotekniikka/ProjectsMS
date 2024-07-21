import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useProjectsContext } from '../../contexts/projectsContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import SelectionDropdown from './SelectionDropdown';
import { useNavigate } from 'react-router-dom';

const TeachersList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { teachers, resources } = useTeachersContext();
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const selectionOptions = ['selectAll', 'selectByYear', 'selectByName'];
   

    const teachersWithResources = resources?.map((resource) => {
        const teach = teachers?.find(teacher => teacher.teacher_id === resource.teacher_id);
        const teacherName = teach ? `${teach.first_name ?? ''} ${teach.last_name ?? ''}`.trim() : 'Unknown';
        return {
            ...resource,
            name: teacherName,
            email: teach?.email || 'Unknown Email'
        };
    });
    teachersWithResources?.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
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
                        <th>{t('totRes')}</th>
                        <th>{t('usedRes')}</th>
                        <th>{t('studyYear')}</th>
                    </tr>
                </thead>
                <tbody>
                    {dataToDisplay.map((teacher) => (
                        <tr key={teacher.resource_id} style={{ fontSize: "13px" }} onClick={() => handleRowClick(teacher)}>
                            <td className="align-middle" style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{fontWeight: "bold"}}>
                                    {teacher.name}
                                </div>
                                <div>
                                    {teacher.email}
                                </div>
                            </td>
                            <td>{teacher.total_resources}</td>
                            <td>{teacher.used_resources}</td>
                            <td>{teacher.study_year}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>

    )

};

export default TeachersList;


