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
  return (
    <div>
      <Router>
        <NavbarComponent />
        <div style={{ display: 'flex' }}> {/* Use a flex container to layout sidebar and main content */}
          {(user !== "") ? <SidebarComponent /> : null} {/* Step 2: Include SidebarComponent */}
          <div style={{ flex: 1 }}> {/* Ensure main content takes the remaining space */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/form" element={<AddNewProject />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};
export default App;