import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useProjectsContext } from "../../contexts/projectsContext";
import documentImg from "../../assets/document.svg";
import noteImg from "../../assets/note.svg";

interface DocumentsListingProps {
    projectId: number;
}

const DocumentsListing: React.FC<DocumentsListingProps> = ({ projectId }) => {
    const { t } = useTranslation();
    const { getProjectNotes, addProjectNote, projectNotes } = useProjectsContext();
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    useEffect(() => {
        const fetchNotes = async () => {
            await getProjectNotes(projectId);
            setNotes(projectNotes);
        };
        fetchNotes();
    }, [projectId]);

    useEffect(() => {
        setNotes(projectNotes);
    }, [projectNotes]);

    const notesWithDocuments = notes?.filter((note) => note.document_path !== "");

    const handleChange = (value: string) => {
        if (value !== '') {
            setNote(value);
        }
    };
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUploadClick = () => {
        document.getElementById('fileInput').click();
    };
    const handleSave = () => {
        // Add here the logic to save the selected file in desired location and get the path of the document

        // For now, add the new note with the hard-coded document path
        const getStudent = JSON.parse(localStorage.getItem('signedInStudent') || '{}');
        const studentName = getStudent?.first_name + " " + getStudent?.last_name || "";
        const newNote = {
            note: note,
            document_path: "http://note1.hardCode.com",
            created_by: studentName,
        };
        addProjectNote(projectId, newNote);
        setNote("");
        handleClose();
    };

    return (
        <>
            <Row className="notes-listing">
                <Col>
                    {notesWithDocuments.length > 0 ? notesWithDocuments.map((note, index) => (
                        <div key={index} className="note-item">
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <img className="note-img" src={noteImg}></img>
                                <div style={{ fontWeight: "bold", color: "#5e5e5e" }}>{note.note}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", padding: "5px 0" }}>
                                <img className="note-img" src={documentImg}></img>
                                <div style={{ fontWeight: "bold", color: "#5e5e5e" }}>{note.document_path}</div>
                            </div>
                            <div>{t('by')}: {note.created_by}</div>
                            <div>{String(note.created_at).split('T')[0]}</div>
                        </div>
                    ))
                        : <div className="note-item">{t('noDocs')}</div>}
                </Col>
                <Col className="note-row" style={{ margin: "10px 0" }}>
                    <Button
                        className="student-view-button"
                        type='button'
                        onClick={() => setShowModal(true)}
                    >
                        {t('addDoc')}
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => { handleClose() }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('addDoc')}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "3% 10%" }}>
                    <div>{t('file')}</div>
                    <Button
                        variant="primary"
                        style={{ width: "100%", height: "35px", margin: "10px 0" }}
                        onClick={handleFileUploadClick}
                    >
                        {t('upload')}
                    </Button>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                        {selectedFile &&
                            <>
                                <div>{t('selectedFile')}:</div>
                                <div style={{ fontFamily: "monospace", fontWeight: "bold" }}>{selectedFile.name}</div>
                            </>
                        }
                    </div>

                    <div>{t('desc')}</div>
                    <Form>
                        <Form.Control
                            style={{ width: "100%", margin: "10px 0" }}
                            type="text"
                            placeholder={t('documentDesc')}
                            onChange={(e) => handleChange(e.target.value)}
                            value={note}
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        style={{ width: "100px", marginRight: "20px" }}
                        onClick={() => { handleClose() }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        style={{ width: "100px" }}
                        onClick={() => handleSave()}
                    >
                        {t('save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DocumentsListing;