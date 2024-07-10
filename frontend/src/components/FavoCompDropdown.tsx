import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { Container, Col, Form, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../contexts/companiesContext';
import { Company } from '../interface/company';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

interface DropdownProps {
    data: Company[];
};

const FavoCompDropdown: React.FC<DropdownProps> = ({ data }) => {
    const { t } = useTranslation();
    const { teacherFavoCompanies, setTeacherFavoCompanies, addCompany, addFavoCompany } = useCompaniesContext();
    const [newCompany, setNewCompany] = useState<string>('');
    const [favoCompanies, setFavoCompanies] = useState<Company[]>([]);

    useEffect(() => {
        if (teacherFavoCompanies) {
            const companiesList = teacherFavoCompanies.map(company => company);
            setFavoCompanies(companiesList);
        }
    }, [teacherFavoCompanies]);
    
    const addToList = (item: Company) => {
        if (favoCompanies.some(company => company.company_id === item.company_id)) {
            setFavoCompanies(favoCompanies.filter(company => company.company_id !== item.company_id));
        } else {
            setFavoCompanies([...favoCompanies, item]);
        }
    };
    
    const saveSelection = async () => {
        // teacher_id below will be replaced with the actual value when the teacher login is implemented
        const teacherId = 1;
        if (favoCompanies.length === 0) return;
        setTeacherFavoCompanies(favoCompanies);
        addFavoCompany(favoCompanies, teacherId);
    };

    const handleChange = (value: string) => {
        if (value !== '') {
            setNewCompany(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // teacher_id below will be replaced with the actual value when the teacher login is implemented
        const teacherId = 1;
        try {
            const companyId = await addCompany(newCompany)

            if (companyId > 0) {
                const updatedFavoCompanies = [...favoCompanies, { company_id: companyId, company_name: newCompany, created_at: null }];
                setFavoCompanies(updatedFavoCompanies);

                addFavoCompany(updatedFavoCompanies, teacherId);
                setTeacherFavoCompanies(updatedFavoCompanies);
                setNewCompany('');
            }
        } catch (error) {
            console.error(`Unable to get companyId: ${error}`)
            return 0;
        }
    };

    return (
        <Container style={{ paddingLeft: "0px", marginTop: "2%" }}>
            <Col >
                <div>{t('selectComp')}</div>
                <div className='dropdown-row'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                            {t('select')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {data.map((item: any, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => addToList(item)}
                                    className={`dropdown-item ${favoCompanies.some(company => company.company_id === item.company_id) ? 'active' : ''}`}
                                    href={"#/action-${index}"}
                                >
                                    {item.company_name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div style={{ marginLeft: "20%" }}>
                        <div className="second-heading">{t('selectedCompList')}</div>
                        <ListGroup>
                            {(favoCompanies.length > 0) ? favoCompanies.map((item, index) => (
                                <ListGroup.Item className='list-item' key={index}>{item.company_name}</ListGroup.Item>
                            )) : <ListGroup.Item>{t('noFavoComp')}</ListGroup.Item>}

                        </ListGroup>
                        <Button
                            style={{ marginTop: "6px" }}
                            className='addCompany-button'
                            onClick={() => saveSelection()}
                        >
                            {t('saveSelection')}
                        </Button>
                    </div>
                </div>
                <div>{t('enterNewComp')}</div>
                <div className='dropdown-row'>
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            style={{ width: "300px" }}
                            onChange={(e) => handleChange(e.target.value)}
                            value={newCompany}
                        />
                    </Form>
                    <Button
                        style={{ marginLeft: "20%" }}
                        type='button'
                        className='addCompany-button'
                        onClick={handleSubmit}
                    >
                        {t('saveInput')}
                    </Button>
                </div>
            </Col>
        </Container>

    );
}

export default FavoCompDropdown;