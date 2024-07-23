import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useProjectsContext } from "../../contexts/projectsContext";
import noteImg from "../../assets/note.svg";


interface NotesListingProps {
    projectId: number;
}

const NotesListing: React.FC<NotesListingProps> = ({ projectId }) => {
    const { t } = useTranslation();
    const { getProjectNotes, addProjectNote, projectNotes } = useProjectsContext();
    const [note, setNote] = useState<string>("");
    const [notes, setNotes] = useState([]);

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

    const handleChange = (value: string) => {
        if (value !== '') {
            setNote(value);
        }
    };

    const handleNewNote = () => {
        const getStudent = JSON.parse(localStorage.getItem('signedInStudent') || '{}');
        const studentName = `${getStudent.first_name} ${getStudent.last_name}`;
    
        const newNote = {
            note: note,
            document_path: "",
            created_by: studentName,
        };
        addProjectNote(projectId, newNote);
        setNote("");
    };

    return (
        <Row className="notes-listing">
            <Col>
                {notes.length > 0 ? notes.map((note, index) => (
                    <div key={index} className="note-item">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <img className="note-img" src={noteImg}></img>
                            <div style={{ fontWeight: "bold", color: "#5e5e5e" }}>{note.note}</div>
                        </div>
                        <div>{t('by')}: {note.created_by}</div>
                        <div>{String(note.created_at).split('T')[0]}</div>
                    </div>
                ))
                    : <div className="note-item">{t('noNotes')}</div>}
            </Col>
            <Col className="note-row" style={{ margin: "10px 0" }}>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder={t('enterNote')}
                        style={{ width: "300px", fontSize: "13px" }}
                        onChange={(e) => handleChange(e.target.value)}
                        value={note}
                    />
                </Form>
                <Button
                    style={{ width: "200px", marginLeft: "10%", marginTop: "4%" }}
                    type='button'
                    size="sm"
                    variant='primary'
                    onClick={handleNewNote}
                >
                    {t('saveNote')}
                </Button>
            </Col>
        </Row>
    );
};

export default NotesListing;