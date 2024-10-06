import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCompaniesContext } from '../../contexts/companiesContext';
import { useTeachersContext } from '../../contexts/teachersContext';
import { Company } from '../../interface/company';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

interface DropdownProps {
    data: Company[];
};

const FavoCompDropdown: React.FC<DropdownProps> = ({ data }) => {
    const { t } = useTranslation();
    const { teacherFavoCompanies, setTeacherFavoCompanies, addCompany, addFavoCompany } = useCompaniesContext();
    const [newCompany, setNewCompany] = useState<string>('');
    const [favoCompanies, setFavoCompanies] = useState<Company[]>([]);
    const { signedInTeacher } = useTeachersContext();

    useEffect(() => {
        if (teacherFavoCompanies) {
            const companiesList = teacherFavoCompanies.map(company => company);
            setFavoCompanies(companiesList);
        }
    }, [teacherFavoCompanies]);

    const addToList = (item: Company) => {
        const teacherId = signedInTeacher?.teacher_id;
        let updatedFavoCompanies: Company[];
        if (favoCompanies.some(company => company.company_id === item.company_id)) {
            updatedFavoCompanies = favoCompanies.filter(company => company.company_id !== item.company_id);
        } else {
            updatedFavoCompanies = [...favoCompanies, item];
        }
        setFavoCompanies(updatedFavoCompanies);
        setTeacherFavoCompanies(updatedFavoCompanies);
        addFavoCompany(updatedFavoCompanies, teacherId);
    };

    const handleChange = (value: string) => {
        setNewCompany(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const teacherId = signedInTeacher?.teacher_id;
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
                <Row className='dropdown-row'>
                    <Col xs={12} lg={7}>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                                {t('select')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {data?.map((item: any, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => addToList(item)}
                                        className={`dropdown-item ${favoCompanies.some(company => company.company_id === item.company_id) ? 'active' : ''}`}
                                        href={"#/action-${index}"}
                                    >
                                        {item.company_name}
                                    </Dropdown.Item>
                                )) || <Dropdown.Item>{t('noComp')}</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={12} lg={5}>
                        <div style={{ marginLeft: "20%" }}>
                            <div className="second-heading">{t('selectedCompList')}</div>
                            <ListGroup>
                                {(favoCompanies.length > 0) ? favoCompanies.map((item, index) => (
                                    <ListGroup.Item className='list-item' key={index}>{item.company_name}</ListGroup.Item>
                                )) : <ListGroup.Item>{t('noFavoComp')}</ListGroup.Item>}

                            </ListGroup>

                        </div>
                    </Col>
                </Row>
                <div>{t('enterNewComp')}</div>
                <Row className='dropdown-row'>
                    <Col xs={12} lg={7}>
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
                            style={{ marginTop: '10px'}}
                            type='button'
                            className='addCompany-button'
                            onClick={handleSubmit}
                        >
                            {t('saveInput')}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Container>

    );
}

export default FavoCompDropdown;