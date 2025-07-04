import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  useEffect(() => {
    axios.get('https://api.dexscreener.com/token-profiles/latest/v1')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
    console.log('App component mounted');
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
