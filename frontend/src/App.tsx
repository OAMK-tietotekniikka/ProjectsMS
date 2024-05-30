import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(
      'https://pm-app-server-pm-app-deploy.2.rahtiapp.fi',
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        setMessage(response.data.message);
      });
  }, []);

  return (
    <div>
      <h3>This is from client</h3>
      {message}
    </div>
  );
}

export default App;
