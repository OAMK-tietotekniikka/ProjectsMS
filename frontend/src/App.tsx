import React, { useState, useEffect} from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { user } = useUserContext();

  return (
    <div>
        <NavbarComponent />
        <div style={{ display: 'flex', flexDirection: "column" }}> {/* Use a flex container to layout sidebar and main content */}
          {(user !== "") ? <SidebarComponent /> : null} {/* Step 2: Include SidebarComponent */}
          <hr style={{margin: "0px"}}/>
          <div> {/* Ensure main content takes the remaining space */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/modifyTeacher/:id" element={<ModifyTeacher />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/studentProject/:id" element={<StudentProjectDetails />} />
              <Route path="/form" element={<AddNewProject />} />
              <Route path="/teachers" element={<Teachers />} />
            </Routes>
          </div>
        </div>
    </div>
  );
};
export default App;