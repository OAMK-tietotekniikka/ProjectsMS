import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

interface DropdownProps {
    data: any[];
    options: string[];
    toggle: string;
    setSelectedData: (data: any[]) => void;
};

const SelectionDropdown: React.FC<DropdownProps> = ({ data, options, toggle, setSelectedData }) => {
    const { t } = useTranslation();
    const [studyYearList, setStudyYearList] = useState<string[]>([]);
    const [classCodeList, setClassCodeList] = useState<string[]>([]);
    const [showSecondSelection, setShowSecondSelection] = useState<string>("");
    const [name, setName] = useState<string>("");

    const handleSelection = (e: React.FormEvent, item: string) => {
        e.preventDefault();
        if (item === options[0]) {
            setSelectedData(data);
            setShowSecondSelection("");
        } else if (item === "selectByYear") {
            const studyYears = data.map((item: any) => item.study_year);
            const uniqueStudyYears = [...new Set(studyYears)];
            setStudyYearList(uniqueStudyYears);
            setShowSecondSelection("studyYear");
        } else if (item === "selectByClass") {
            const classCodes = data.map((item: any) => item.class_code);
            const uniqueClassCodes = [...new Set(classCodes)];
            setClassCodeList(uniqueClassCodes);
            setShowSecondSelection("classCode");
        } else {
            setShowSecondSelection("name");
        }
    };

    const handleStudyYear = (e: React.FormEvent, item: string) => {
        e.preventDefault();
        const filteredData = data.filter((data: any) => data.study_year === item);
        setSelectedData(filteredData);
    };

    const handleClassCode = (e: React.FormEvent, item: string) => {
        e.preventDefault();
        const filteredData = data.filter((data: any) => data.class_code === item);
        setSelectedData(filteredData);
    };

    const handleChange = (value: string) => {
        if (value !== '') {
            setName(value);
        }
    };

    const handleNameSelection = () => {
        const filteredData = data.filter((data: any) => (data.name).toLowerCase() === name.toLowerCase());
        console.log(filteredData);
        console.log(data);
        if (filteredData.length === 0)  {
            setSelectedData([]);
            alert("Name not found");
        } else {
            setSelectedData(filteredData);
        }
        
    };

    return (
        <Container style={{ paddingLeft: "0px", marginTop: "2%" }}>
            <Col >
                <div className='dropdown-row'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                            {t(toggle)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((item: any, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={(e) => handleSelection(e, item)}
                                    className="dropdown-item"
                                    href={"#/action-${index}"}
                                >
                                    {t(item)}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div style={{ marginLeft: "12%" }}>
                        {showSecondSelection === "studyYear" && (
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                                    {t('selectByStudyYear')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {studyYearList?.map((item: any, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={(e) => handleStudyYear(e, item)}
                                            className="dropdown-item"
                                            href={"#/action-${index}"}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    )) || <Dropdown.Item>{t('noComp')}</Dropdown.Item>}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                        {showSecondSelection === "classCode" && (
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle'>
                                    {t('selectClass')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {classCodeList?.map((item: any, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            onClick={(e) => handleClassCode(e, item)}
                                            className="dropdown-item"
                                            href={"#/action-${index}"}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    )) || <Dropdown.Item>{t('noComp')}</Dropdown.Item>}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                        {showSecondSelection === "name" && (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Form>
                                    <Form.Control
                                        type="text"
                                        placeholder={t('enterNote')}
                                        style={{ width: "300px", fontSize: "13px" }}
                                        onChange={(e) => handleChange(e.target.value)}
                                        value={name}
                                    />
                                </Form>
                                <Button
                                    style={{ marginLeft: "20%", marginTop: "4%" }}
                                    type='button'
                                    className='addCompany-button'
                                    onClick={handleNameSelection}
                                >
                                    {t('selectName')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Col>
        </Container>
    );
};

export default SelectionDropdown;