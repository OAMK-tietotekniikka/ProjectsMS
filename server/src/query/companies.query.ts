export const QUERY = {
    SELECT_COMPANIES: 'SELECT * FROM companies ORDER BY created_at DESC LIMIT 50',
    SELECT_COMPANY: 'SELECT * FROM companies WHERE company_id = ?',  
    CREATE_COMPANY: 'INSERT INTO companies (company_name) VALUES (?)'
};