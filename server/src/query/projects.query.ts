export const QUERY = {
    SELECT_PROJECTS: 'SELECT * FROM projects ORDER BY created_at DESC LIMIT 50',
    SELECT_PROJECT: 'SELECT * FROM projects WHERE projectId = ?',  
    CREATE_PROJECT: 'INSERT INTO projects (projectName, projectDesc, teacherId, companyId, projectStatus, projectUrl, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PROJECT: 'UPDATE projects SET projectName = ?, projectDesc = ?, teacherId = ?, companyId = ?, projectStatus = ?, projectUrl = ?, start_date = ?, end_date = ? WHERE projectId = ?',
    DELETE_PROJECT: 'DELETE FROM projects WHERE projectId = ?'
};