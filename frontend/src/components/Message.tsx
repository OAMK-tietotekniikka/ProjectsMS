
import { useEffect, useState } from 'react';
import axios from 'axios';

const Message: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}

export default Message;