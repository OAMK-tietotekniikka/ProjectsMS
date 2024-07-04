import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next';
import TeachersContextProvider from './contexts/teachersContext';
import CompaniesContextProvider from './contexts/companiesContext';
import UserContextProvider from './contexts/userContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <UserContextProvider>
        <TeachersContextProvider>
          <CompaniesContextProvider>
            <App />
          </CompaniesContextProvider>
        </TeachersContextProvider>
      </UserContextProvider>
    </I18nextProvider>
  </React.StrictMode>
)