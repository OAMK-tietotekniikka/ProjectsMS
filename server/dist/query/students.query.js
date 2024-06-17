"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_STUDENTS: 'SELECT * FROM students ORDER BY created_at DESC LIMIT 50',
    SELECT_STUDENT: 'SELECT * FROM students WHERE studentId = ?',
    CREATE_STUDENT: 'INSERT INTO students (first_name, last_name, email, class_code, password) VALUES (?, ?, ?, ?, ?)',
    UPDATE_STUDENT: 'UPDATE students SET first_name = ?, last_name = ?, email = ?, class_code = ?, password = ? WHERE studentId = ?',
    DELETE_STUDENT: 'DELETE FROM students WHERE studentId = ?'
};
