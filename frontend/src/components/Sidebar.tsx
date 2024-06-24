// frontend/src/components/Sidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SidebarComponent: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Nav className="flex-column bg-light" style={{ height: '100vh', padding: '10px' }}>
            <Nav.Link href="/">{t('home')}</Nav.Link>
            <Nav.Link href="/form">{t('createProj')}</Nav.Link>
            {/* Add more links as needed */}
        </Nav>
    );
};

export default SidebarComponent;