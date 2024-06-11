import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';


const NavbarComponent = () => { 
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
      }

    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>{t('appName')}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <div className='nav-home'>
                        <Nav.Link href="/">{t('home')}</Nav.Link>
                    </div>
                    <div className="nav-language">
                        <Nav.Link onClick={() => changeLanguage("fi")}>FI</Nav.Link>
                        <Nav.Item>|</Nav.Item>
                        <Nav.Link onClick={() => changeLanguage("en")}>EN</Nav.Link>
                    </div>
                    <div>
                        <Nav.Link>{t('login')}</Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;