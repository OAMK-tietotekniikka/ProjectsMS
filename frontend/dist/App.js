import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar'; // Step 1: Import SidebarComponent
import LandingPage from './views/LandingPage';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import Teachers from './views/Teachers';
import ModifyTeacher from './views/ModifyTeacher';
import StudentProjectDetails from './views/StudentProjectDetails';
import { useUserContext } from './contexts/userContext';
import RouteProtection from './components/RouteProtection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
    const { user } = useUserContext();
    return (_jsxs("div", { children: [_jsx(NavbarComponent, {}), _jsxs("div", { style: { display: 'flex', flexDirection: "column" }, children: [" ", (user !== "") ? _jsx(SidebarComponent, {}) : null, " ", _jsx("hr", { style: { margin: "0px" } }), _jsxs("div", { children: [" ", _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(RouteProtection, { path: "/teacher", element: _jsx(TeacherDashboard, {}), roles: [user] }), _jsx(RouteProtection, { path: "/modifyTeacher/:id", element: _jsx(ModifyTeacher, {}), roles: [user] }), _jsx(RouteProtection, { path: "/student", element: _jsx(StudentDashboard, {}), roles: [user] }), _jsx(RouteProtection, { path: "/studentProject/:id", element: _jsx(StudentProjectDetails, {}), roles: [user] }), _jsx(RouteProtection, { path: "/form", element: _jsx(AddNewProject, {}), roles: [user] }), _jsx(RouteProtection, { path: "/teachers", element: _jsx(Teachers, {}), roles: [user] })] })] })] })] }));
}
;
export default App;
