export const QUERY = {
    SELECT_COMPANIES: 'SELECT * FROM companies ORDER BY company_name ASC',
    SELECT_COMPANY: 'SELECT * FROM companies WHERE company_id = ?',
    SELECT_BY_NAME: 'SELECT * FROM companies WHERE company_name = ?',
    CREATE_COMPANY: 'INSERT INTO companies (company_name) VALUES (?)',

    SELECT_FAVO_COMPANIES: 'SELECT companies.company_id, companies.company_name FROM company_teacher JOIN companies ON company_teacher.company_id = companies.company_id JOIN teachers ON company_teacher.teacher_id = teachers.teacher_id WHERE teachers.teacher_id = ? ORDER BY companies.company_name ASC;',
    ADD_FAVO_COMPANY: 'INSERT INTO company_teacher (company_id, teacher_id) VALUES (?, ?)',
    DELETE_FAVO_COMPANY: 'DELETE FROM company_teacher WHERE teacher_id = ?'
};
