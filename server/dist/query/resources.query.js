"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.R_QUERY = void 0;
exports.R_QUERY = {
    SELECT_RESOURCES: 'SELECT * FROM resources ORDER BY created_at DESC LIMIT 50',
    SELECT_RESOURCE: 'SELECT * FROM resources WHERE resource_id = ?',
    CREATE_RESOURCE: 'INSERT INTO resources (teacher_id, total_resources, used_resources, study_year) VALUES (?, ?, ?, ?)',
    UPDATE_RESOURCE: 'UPDATE resources SET teacher_id = ?, total_resources = ?, used_resources = ?, study_year = ? WHERE resource_id = ?',
    DELETE_RESOURCE: 'DELETE FROM resources WHERE resource_id = ?'
};
