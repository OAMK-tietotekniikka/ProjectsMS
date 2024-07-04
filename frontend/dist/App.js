import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar'; // Step 1: Import SidebarComponent
import LandingPage from './views/LandingPage';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import { useUserContext } from './contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
    const { user } = useUserContext();
    return (_jsx("div", { children: _jsxs(Router, { children: [_jsx(NavbarComponent, {}), _jsxs("div", Object.assign({ style: { display: 'flex' } }, { children: [" ", (user !== "") ? _jsx(SidebarComponent, {}) : null, " ", _jsxs("div", Object.assign({ style: { flex: 1 } }, { children: [" ", _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/teacher", element: _jsx(TeacherDashboard, {}) }), _jsx(Route, { path: "/student", element: _jsx(StudentDashboard, {}) }), _jsx(Route, { path: "/form", element: _jsx(AddNewProject, {}) })] })] }))] }))] }) }));
}
;
export default App;
