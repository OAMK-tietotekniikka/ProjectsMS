import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import Teachers from './views/Teachers';
import ModifyTeacher from './views/ModifyTeacher';
import StudentProjectDetails from './views/StudentProjectDetails';
import SignInPageWithEntra from './views/SignInPageWithEntra';
import { useUserContext } from './contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
    const { user } = useUserContext();
    return (_jsxs("div", { children: [_jsx(NavbarComponent, {}), _jsxs("div", { style: { display: 'flex', flexDirection: "column" }, children: [(user !== "") ? _jsx(SidebarComponent, {}) : null, _jsx("hr", { style: { margin: "0px" } }), _jsx("div", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(SignInPageWithEntra, {}) }), user === "teacher" && _jsx(Route, { path: "/teacher", element: _jsx(TeacherDashboard, {}) }), user === "teacher" && _jsx(Route, { path: "/modifyTeacher/:id", element: _jsx(ModifyTeacher, {}) }), _jsx(Route, { path: "/form", element: _jsx(AddNewProject, {}) }), user === "student" && _jsx(Route, { path: "/student", element: _jsx(StudentDashboard, {}) }), _jsx(Route, { path: "/studentProject/:id", element: _jsx(StudentProjectDetails, {}) }), user === "teacher" && _jsx(Route, { path: "/teachers", element: _jsx(Teachers, {}) })] }) })] })] }));
}
;
export default App;
