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
    const { getProjectNotes, addProjectNote,deleteProjectNote, projectNotes, projects } = useProjectsContext();
    const [note, setNote] = useState<string>("");
    const [notes, setNotes] = useState([]);

    const currentProject = projects.find((project) => project.project_id === projectId);

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

   const handleDeleteNote = (noteId: number) => {
        deleteProjectNote(projectId, noteId);
        setNotes(notes.filter((note: any) => note.note_id !== noteId));
    }

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
                        <Button
                            className="delete-note-button"
                            variant="danger"
                            onClick={() => handleDeleteNote(note.note_id)}
                        >
                            {t('delete')}
                        </Button>
                    </div>
                ))
                    : <div className="note-item">{t('noNotes')}</div>}
            </Col>
            {currentProject?.project_status !== "completed" ?
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
                        className="student-view-button"
                        type='button'
                        onClick={handleNewNote}
                        disabled={note === ""}
                    >
                        {t('saveNote')}
                    </Button>
                </Col>
                : null}
        </Row>
    );
};

export default NotesListing;