import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Message from './components/Message';
import AddNewProject from './views/AddNewProject';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Message />} />
          <Route path="/form" element={<AddNewProject />} />
        </Routes>
      </Router>
    </div>

  );
}
export default App;