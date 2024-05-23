import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://cop-server-2-cop-ms.2.rahtiapp.fi/')
      .then(response => {
        setMessage(response.data.message);
      });
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}

export default App;
