"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_STUDENTS: 'SELECT * FROM students ORDER BY created_at DESC LIMIT 50',
    SELECT_STUDENT: 'SELECT * FROM students WHERE student_id = ?',
    CREATE_STUDENT: 'INSERT INTO students (first_name, last_name, email, class_code, password) VALUES (?, ?, ?, ?, ?)',
    UPDATE_STUDENT: 'UPDATE students SET first_name = ?, last_name = ?, email = ?, class_code = ?, password = ? WHERE student_id = ?',
    DELETE_STUDENT: 'DELETE FROM students WHERE student_id = ?',
    SELECT_STUDENT_BY_EMAIL: 'SELECT * FROM students WHERE email = ?',
};
