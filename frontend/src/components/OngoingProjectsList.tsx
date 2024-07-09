import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Project } from '../interface/project';
import { useTranslation } from 'react-i18next';

interface OngoingProjectsProps {
}

const OngoingProjectsList: React.FC<OngoingProjectsProps> = ({ }) => {
    const { t } = useTranslation();
    return (
        <div>Table of ongoing projects here</div>
    )
    
};

export default OngoingProjectsList;