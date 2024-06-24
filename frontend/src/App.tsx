import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Message from './components/Message';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import SidebarComponent from './components/Sidebar'; // Step 1: Import SidebarComponent
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <NavbarComponent />
        <div style={{ display: 'flex' }}> {/* Use a flex container to layout sidebar and main content */}
          <SidebarComponent /> {/* Step 2: Include SidebarComponent */}
          <div style={{ flex: 1 }}> {/* Ensure main content takes the remaining space */}
            <Routes>
              <Route path="/" element={<Message />} />
              <Route path="/form" element={<AddNewProject />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
export default App;