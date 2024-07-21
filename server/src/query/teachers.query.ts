export const QUERY = {
    SELECT_TEACHERS: 'SELECT * FROM teachers ORDER BY last_name ASC LIMIT 50',
    SELECT_TEACHER: 'SELECT * FROM teachers WHERE teacher_id = ?',  
    CREATE_TEACHER: 'INSERT INTO teachers (first_name, last_name, email) VALUES (?, ?, ?)',
    UPDATE_TEACHER: 'UPDATE teachers SET first_name = ?, last_name = ?, email = ? WHERE teacher_id = ?',

    SELECT_TEACHERS_BY_COMPANY: 'SELECT teachers.teacher_id, teachers.first_name, teachers.last_name FROM company_teacher JOIN teachers ON company_teacher.teacher_id = teachers.teacher_id JOIN companies ON company_teacher.company_id = companies.company_id WHERE companies.company_name = ?'
};