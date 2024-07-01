import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Message from './components/Message';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar'; // Step 1: Import SidebarComponent
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
    return (_jsx("div", { children: _jsxs(Router, { children: [_jsx(NavbarComponent, {}), _jsxs("div", Object.assign({ style: { display: 'flex' } }, { children: [" ", _jsx(SidebarComponent, {}), " ", _jsxs("div", Object.assign({ style: { flex: 1 } }, { children: [" ", _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Message, {}) }), _jsx(Route, { path: "/form", element: _jsx(AddNewProject, {}) })] })] }))] }))] }) }));
}
export default App;
