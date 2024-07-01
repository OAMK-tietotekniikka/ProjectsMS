import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next';
import TeachersContextProvider from './contexts/teachersContext';
import CompaniesContextProvider from './contexts/companiesContext';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(I18nextProvider, Object.assign({ i18n: i18n }, { children: _jsx(TeachersContextProvider, { children: _jsx(CompaniesContextProvider, { children: _jsx(App, {}) }) }) })) }));
