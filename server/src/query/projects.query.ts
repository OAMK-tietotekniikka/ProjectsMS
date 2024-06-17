export const QUERY = {
    SELECT_PROJECTS: 'SELECT * FROM projects ORDER BY created_at DESC LIMIT 50',
    SELECT_PROJECT: 'SELECT * FROM projects WHERE project_id = ?',  
    CREATE_PROJECT: 'INSERT INTO projects (project_name, project_desc, teacher_id, company_id, project_status, project_url, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PROJECT: 'UPDATE projects SET project_name = ?, project_desc = ?, teacher_id = ?, company_id = ?, project_status = ?, project_url = ?, start_date = ?, end_date = ? WHERE project_id = ?',
    DELETE_PROJECT: 'DELETE FROM projects WHERE project_id = ?'
};