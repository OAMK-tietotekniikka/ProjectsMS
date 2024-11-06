import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useProjectsContext } from "../../contexts/projectsContext";
import { useUserContext } from "../../contexts/userContext";
import noteImg from "../../assets/note.svg";


interface NotesListingProps {
    projectId: number;
}

const NotesListing: React.FC<NotesListingProps> = ({ projectId }) => {
    const { t } = useTranslation();
    const { getProjectNotes, addProjectNote, deleteProjectNote, projectNotes, projects } = useProjectsContext();
    const [note, setNote] = useState<string>("");
    const [notes, setNotes] = useState([]);
    const { user } = useUserContext();

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNote(value);
    };

    const handleNewNote = () => {
        const getUser = user === "student" ?
            JSON.parse(localStorage.getItem('signedInStudent') || '{}')
            : JSON.parse(localStorage.getItem('signedInTeacher') || '{}')

        const userName = user === "student" ? getUser.student_name : getUser.teacher_name;

        const newNote = {
            note: note,
            document_path: "", // For now, add new note without the document path. When the actual document path is added, it will be added here.
            created_by: userName,
        };
        addProjectNote(projectId, newNote);
        setNote("");
    };

    const handleDeleteNote = (noteId: number) => {
        deleteProjectNote(projectId, noteId);
        setNotes(notes.filter((note: any) => note.note_id !== noteId));
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
                        <Form.Label style={{ fontWeight: "bold" }}>{t('addNewNote')}</Form.Label>
                        <Form.Group controlId="new_note">
                            <Form.Control
                                type="text"
                                style={{ width: "300px", fontSize: "13px" }}
                                onChange={handleChange}
                                value={note}
                            />
                        </Form.Group>
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