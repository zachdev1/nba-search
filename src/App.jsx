import React, {Component, useEffect, useState} from 'react';
import axios from "axios";

function App(){
  const [playerName, setPlayerName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/players?name=${playerName}`);
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <div className="App">
      <h1>NBA Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Player Name</label>
        <input 
          type="text" 
          id="playerName"
          placeholder='Enter Player Name'
          value={playerName}
          onChange={handleChange}
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}
export default App;