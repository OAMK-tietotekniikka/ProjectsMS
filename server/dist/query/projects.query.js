"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_PROJECTS: 'SELECT * FROM projects ORDER BY created_at DESC LIMIT 50',
    SELECT_PROJECT: 'SELECT * FROM projects WHERE project_id = ?',
    CREATE_PROJECT: 'INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PROJECT: 'UPDATE projects SET project_name = ?, project_desc = ?, teacher_id = ?, company_id = ?, project_status = ?, project_url = ?, start_date = ?, end_date = ? WHERE project_id = ?',
    DELETE_PROJECT_BY_ID: 'DELETE FROM projects WHERE project_id = ?',
    SELECT_STUDENT_PROJECTS: 'SELECT * FROM student_project ORDER BY student_id ASC',
    CREATE_STUDENT_PROJECT: 'INSERT INTO student_project (student_id, project_id, project_number) VALUES (?, ?, ?)',
    SELECT_STUDENT_PROJECTS_BY_STUDENT_ID: 'SELECT * FROM student_project WHERE student_id = ?',
    INSERT_PROJECT_NOTE: 'INSERT INTO project_note (project_id, note, document_path, created_by) VALUES (?, ?, ?, ?)',
    SELECT_PROJECT_NOTES: 'SELECT * FROM project_note WHERE project_id = ?',
    DELETE_PROJECT_NOTE: 'DELETE FROM project_note WHERE note_id = ? AND project_id = ?',
    DELETE_STUDENT_PROJECT: 'DELETE FROM student_project WHERE student_id = ? AND project_id = ?',
    DELETE_STUDENT_PROJECT_BY_PROJECT_ID: 'DELETE FROM student_project WHERE project_id = ?',
    DELETE_PROJECT_NOTES_BY_PROJECT_ID: 'DELETE FROM project_note WHERE project_id = ?',
};
