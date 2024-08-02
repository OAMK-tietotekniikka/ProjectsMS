import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Resource } from '../../interface/resource';
import { useTranslation } from 'react-i18next';


interface PastResourcesProps {
    study_year: string;
    resources: Resource[];
    id: number;
    showTable: boolean;
    handleClose: () => void;
}

const PastResources: React.FC<PastResourcesProps> = ({ study_year, resources, id, showTable, handleClose }) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    if (!showTable) return null;
    // Filter resources by teacher id and sort ascending by study year
    const filteredResources = resources?.filter(resource => {
        const resourceYear = parseInt(resource.study_year.split('-')[0], 10);
        return resource.teacher_id === id && resourceYear < currentYear && resource.study_year !== study_year;
    });

    filteredResources?.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
        return yearA - yearB;
    });

    return (
        <div className="resources-table">
            <Table hover size='sm'>
                <thead>
                    <tr style={{ fontSize: "13px", backgroundColor: "#eaeaea" }}>
                        <th>{t('studyYear')}</th>
                        <th>{t('totRes')}</th>
                        <th>{t('usedRes')}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResources? filteredResources.map((resource, index) => (  
                        <tr key={index} style={{ fontSize: "13px", backgroundColor: "#eaeaea" }}>
                            <td>{resource.study_year}</td>
                            <td>{resource.total_resources}</td>
                            <td>{resource.used_resources}</td>
                        </tr>
                    ))
                    : null  }
                </tbody>
            </Table>
            <Button className='resources-button' onClick={handleClose}>{t('close')}</Button>
        </div>
    );
};

export default PastResources;
