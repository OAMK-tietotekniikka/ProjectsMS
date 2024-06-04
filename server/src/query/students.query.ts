export const QUERY = {
    SELECT_STUDENTS: 'SELECT * FROM students ORDER BY created_at DESC LIMIT 50',
    SELECT_STUDENT: 'SELECT * FROM students WHERE id = ?',  
    CREATE_STUDENT: 'INSERT INTO students (first_name,last_name, email, phone, status) VALUES (?, ?, ?, ?, ?)',
    UPDATE_STUDENT: 'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, status = ? WHERE id = ?',
    DELETE_STUDENT: 'DELETE FROM students WHERE id = ?',

};