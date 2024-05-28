import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(
      'https://cop-server-3-cop-ms.2.rahtiapp.fi',
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
      <h3>Message from server:</h3>
      {message}
    </div>
  );
}

export default App;
