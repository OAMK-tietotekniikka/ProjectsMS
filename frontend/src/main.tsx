import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next';
import { BrowserRouter } from 'react-router-dom';
import TeachersContextProvider from './contexts/teachersContext';
import CompaniesContextProvider from './contexts/companiesContext';
import UserContextProvider from './contexts/userContext';
import ProjectsContextProvider from './contexts/projectsContext';
import StudentsContextProvider from './contexts/studentsContext';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import './index.css'

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <UserContextProvider>
            <ProjectsContextProvider>
              <StudentsContextProvider>
                <TeachersContextProvider>
                  <CompaniesContextProvider>
                    <App />
                  </CompaniesContextProvider>
                </TeachersContextProvider>
              </StudentsContextProvider>
            </ProjectsContextProvider>
          </UserContextProvider>
        </I18nextProvider>
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode >
)