var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useProjectsContext } from "../../contexts/projectsContext";
import documentImg from "../../assets/document.svg";
import noteImg from "../../assets/note.svg";
const DocumentsListing = ({ projectId }) => {
    const { t } = useTranslation();
    const { getProjectNotes, addProjectNote, projectNotes } = useProjectsContext();
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
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
    const notesWithDocuments = notes === null || notes === void 0 ? void 0 : notes.filter((note) => note.document_path !== "");
    const handleChange = (value) => {
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
        const studentName = (getStudent === null || getStudent === void 0 ? void 0 : getStudent.first_name) + " " + (getStudent === null || getStudent === void 0 ? void 0 : getStudent.last_name) || "";
        const newNote = {
            note: note,
            document_path: "http://note1.hardCode.com",
            created_by: studentName,
        };
        addProjectNote(projectId, newNote);
        setNote("");
        handleClose();
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { className: "notes-listing", children: [_jsx(Col, { children: notesWithDocuments.length > 0 ? notesWithDocuments.map((note, index) => (_jsxs("div", { className: "note-item", children: [_jsxs("div", { style: { display: "flex", flexDirection: "row" }, children: [_jsx("img", { className: "note-img", src: noteImg }), _jsx("div", { style: { fontWeight: "bold", color: "#5e5e5e" }, children: note.note })] }), _jsxs("div", { style: { display: "flex", flexDirection: "row", padding: "5px 0" }, children: [_jsx("img", { className: "note-img", src: documentImg }), _jsx("div", { style: { fontWeight: "bold", color: "#5e5e5e" }, children: note.document_path })] }), _jsxs("div", { children: [t('by'), ": ", note.created_by] }), _jsx("div", { children: String(note.created_at).split('T')[0] })] }, index)))
                            : _jsx("div", { className: "note-item", children: t('noDocs') }) }), _jsx(Col, { className: "note-row", style: { margin: "10px 0" }, children: _jsx(Button, { className: "student-view-button", type: 'button', onClick: () => setShowModal(true), children: t('addDoc') }) })] }), _jsxs(Modal, { show: showModal, onHide: () => { handleClose(); }, animation: false, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: t('addDoc') }) }), _jsxs(Modal.Body, { style: { padding: "3% 10%" }, children: [_jsx("div", { children: t('file') }), _jsx(Button, { variant: "primary", style: { width: "100%", height: "35px", margin: "10px 0" }, onClick: handleFileUploadClick, children: t('upload') }), _jsx("input", { type: "file", id: "fileInput", style: { display: 'none' }, onChange: handleFileChange }), _jsx("div", { style: { textAlign: "center", paddingBottom: "10px" }, children: selectedFile &&
                                    _jsxs(_Fragment, { children: [_jsxs("div", { children: [t('selectedFile'), ":"] }), _jsx("div", { style: { fontFamily: "monospace", fontWeight: "bold" }, children: selectedFile.name })] }) }), _jsx("div", { children: t('desc') }), _jsx(Form, { children: _jsx(Form.Control, { style: { width: "100%", margin: "10px 0" }, type: "text", placeholder: t('documentDesc'), onChange: (e) => handleChange(e.target.value), value: note }) })] }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", style: { width: "100px", marginRight: "20px" }, onClick: () => { handleClose(); }, children: t('cancel') }), _jsx(Button, { style: { width: "100px" }, onClick: () => handleSave(), children: t('save') })] })] })] }));
};
export default DocumentsListing;
