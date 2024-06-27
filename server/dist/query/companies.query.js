"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_COMPANIES: 'SELECT * FROM companies ORDER BY created_at DESC LIMIT 50',
    SELECT_COMPANY: 'SELECT * FROM companies WHERE company_id = ?',
    CREATE_COMPANY: 'INSERT INTO companies (company_name) VALUES (?)'
};
