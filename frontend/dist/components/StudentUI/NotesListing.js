var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useProjectsContext } from "../../contexts/projectsContext";
import { useUserContext } from "../../contexts/userContext";
import noteImg from "../../assets/note.svg";
const NotesListing = ({ projectId }) => {
    const { t } = useTranslation();
    const { getProjectNotes, addProjectNote, deleteProjectNote, projectNotes, projects } = useProjectsContext();
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const { user } = useUserContext();
    const currentProject = projects.find((project) => project.project_id === projectId);
    useEffect(() => {
        const fetchNotes = () => __awaiter(void 0, void 0, void 0, function* () {
            yield getProjectNotes(projectId);
            setNotes(projectNotes);
        });
        fetchNotes();
    }, [projectId]);
    useEffect(() => {
        setNotes(projectNotes);
    }, [projectNotes]);
    const handleChange = (e) => {
        const value = e.target.value;
        setNote(value);
    };
    const handleNewNote = () => {
        const getUser = user === "student" ?
            JSON.parse(localStorage.getItem('signedInStudent') || '{}')
            : JSON.parse(localStorage.getItem('signedInTeacher') || '{}');
        const userName = `${getUser.first_name} ${getUser.last_name}`;
        const newNote = {
            note: note,
            document_path: "", // For now, add new note without the document path. When the actual document path is added, it will be added here.
            created_by: userName,
        };
        addProjectNote(projectId, newNote);
        setNote("");
    };
    const handleDeleteNote = (noteId) => {
        deleteProjectNote(projectId, noteId);
        setNotes(notes.filter((note) => note.note_id !== noteId));
    };
    return (_jsxs(Row, { className: "notes-listing", children: [_jsx(Col, { children: notes.length > 0 ? notes.map((note, index) => (_jsxs("div", { className: "note-item", children: [_jsxs("div", { style: { display: "flex", flexDirection: "row" }, children: [_jsx("img", { className: "note-img", src: noteImg }), _jsx("div", { style: { fontWeight: "bold", color: "#5e5e5e" }, children: note.note })] }), _jsxs("div", { children: [t('by'), ": ", note.created_by] }), _jsx("div", { children: String(note.created_at).split('T')[0] }), _jsx(Button, { className: "delete-note-button", variant: "danger", onClick: () => handleDeleteNote(note.note_id), children: t('delete') })] }, index)))
                    : _jsx("div", { className: "note-item", children: t('noNotes') }) }), (currentProject === null || currentProject === void 0 ? void 0 : currentProject.project_status) !== "completed" ?
                _jsxs(Col, { className: "note-row", style: { margin: "10px 0" }, children: [_jsxs(Form, { children: [_jsx(Form.Label, { style: { fontWeight: "bold" }, children: t('addNewNote') }), _jsx(Form.Group, { controlId: "new_note", children: _jsx(Form.Control, { type: "text", style: { width: "300px", fontSize: "13px" }, onChange: handleChange, value: note }) })] }), _jsx(Button, { className: "student-view-button", type: 'button', onClick: handleNewNote, disabled: note === "", children: t('saveNote') })] })
                : null] }));
};
export default NotesListing;
