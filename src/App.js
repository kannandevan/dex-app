// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import TokenLists from './pages/TokenLists';
function App() {
  useEffect(() => {
    axios.get('https://api.dexscreener.com/token-profiles/latest/v1')
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
    // console.log('App component mounted');
  }, []);
  return (
    <div className="App text-center">
      <h1 className="mt-5">Token Lists</h1> 
      <TokenLists />
    </div>
  );
}

export default App;
