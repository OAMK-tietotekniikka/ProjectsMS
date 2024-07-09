import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Resource } from '../interface/resource';
import { useTranslation } from 'react-i18next';


interface PastResourcesProps {
    resources: Resource[];
    id: number;
    showTable: boolean;
    handleClose: () => void;
}

const PastResources: React.FC<PastResourcesProps> = ({ resources, id, showTable, handleClose }) => {
    const { t } = useTranslation();

    if (!showTable) return null;
    // Filter resources by teacher id and sort ascending by study year
    const filteredResources = resources.filter(resource => resource.teacher_id === id);
    filteredResources.sort((a, b) => {
        const yearA = parseInt(a.study_year.split('-')[0], 10);
        const yearB = parseInt(b.study_year.split('-')[0], 10);
        return yearA - yearB;
    });

    return (
        <div className="resources-table">
            <Table hover size='sm'>
                <thead>
                    <tr style={{ fontSize: "13px", backgroundColor: "#eaeaea" }}>
                        <th>Study Year</th>
                        <th>Total Resources</th>
                        <th>Used Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResources.map((resource) => (  
                        <tr key={resource.resource_id} style={{ fontSize: "13px", backgroundColor: "#eaeaea" }}>
                            <td>{resource.study_year}</td>
                            <td>{resource.total_resources}</td>
                            <td>{resource.used_resources}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={handleClose}>Close</Button>
        </div>
    );
};

export default PastResources;
