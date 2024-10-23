// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { useTranslation } from 'react-i18next';
// import { useUserContext } from '../contexts/userContext';


// const NavbarComponent = () => { 
//     const {t, i18n} = useTranslation();
//     const {token, logout} = useUserContext();

//     const changeLanguage = (lng: string) => {
//         i18n.changeLanguage(lng);
//       }

//     return (
//         <Navbar className="navbar bg-body-tertiary">
//             <Container className="nav-mainbar">
//                 <Navbar.Brand className='nav-brand'>{t('appName')}</Navbar.Brand>
//                 <Navbar.Toggle />
//                 <Navbar.Collapse className="justify-content-end">
//                     <div className='nav-home'>
//                         <Nav.Link onClick={() => localStorage.setItem('user', "")} href="/">{t('home')}</Nav.Link>
//                     </div>
//                     <div className="nav-language">
//                         <Nav.Link onClick={() => changeLanguage("fi")}>FI</Nav.Link>
//                         <Nav.Item>|</Nav.Item>
//                         <Nav.Link onClick={() => changeLanguage("en")}>EN</Nav.Link>
//                     </div>
//                     <div>
//                         <Nav.Link onClick={logout}>{token !== "" ? t('logout') : ""}</Nav.Link>
//                     </div>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default NavbarComponent;


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useMsal } from '@azure/msal-react';
import { useUserContext } from '../contexts/userContext';
import { Button } from 'react-bootstrap';

const NavbarComponent = () => {
  const { t, i18n } = useTranslation();
  const { instance } = useMsal();
  const { user, setUser, logout } = useUserContext();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = async () => {
    const token = await instance.acquireTokenPopup({
      scopes: ['user.read'],
    });

    const claims = token.idTokenClaims as any;
    const roles = claims.roles || [];

    // Set user role in context
    if (roles.includes('student')) {
      setUser('student');
    } else if (roles.includes('teacher')) {
      setUser('teacher');
    }

    console.log(token);
  };

  const handleLogout = async () => {
    await instance.logoutPopup();
    logout();
  };

  return (
    <Navbar className="navbar bg-body-tertiary">
      <Container className="nav-mainbar">
        <Navbar.Brand className="nav-brand">{t('appName')}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="nav-home">
            <Nav.Link onClick={() => localStorage.setItem('user', '')} href="/">
              {t('home')}
            </Nav.Link>
          </div>
          <div className="nav-language">
            <Nav.Link onClick={() => changeLanguage('fi')}>FI</Nav.Link>
            <Nav.Item>|</Nav.Item>
            <Nav.Link onClick={() => changeLanguage('en')}>EN</Nav.Link>
          </div>
          <div>
            {user ? (
              <Button onClick={handleLogout} variant="danger" size="sm">
                {t('logout')}
              </Button>
            ) : (
              <Button onClick={handleLogin} variant="primary" size="sm">
                {t('login')}
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;