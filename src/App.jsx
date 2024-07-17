import React, { useState } from 'react';
import axios from "axios";
import './App.css';


const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/players?name=${playerName}`);
      setPlayerStats(response.data); 
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div className='App'>
      <header>
        <img src="assets/icons8-basketball-96.png" alt='basketball' />
        <h1>NBA Search</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="playerName"
          placeholder='Enter Player Name'
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <br />
        <button type='submit'>Search</button>
      </form>

      <div className='Avg'>
        <h1>Player Season Averages</h1>
        {playerStats.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Team</th>
              <th>PPG</th>
              <th>RPG</th>
              <th>APG</th>
              <th>BPG</th>
              <th>SPG</th>
            </tr>
          </thead>
          <tbody>
          {playerStats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.SEASON_ID}</td>
                  <td>{stat.TEAM_ABBREVIATION}</td>
                  <td>{stat.PPG}</td>
                  <td>{stat.RPG}</td>
                  <td>{stat.APG}</td>
                  <td>{stat.BPG}</td>
                  <td>{stat.SPG}</td>
                </tr>
              ))}
          </tbody>
        </table>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <footer>
        <p>Made by: Zachary Mohamed</p>
        <p>
          <a target="_blank" href="https://github.com/zachdev1/nba-search">GitHub Repo</a>
        </p>
        <a target="_blank" href="https://icons8.com/icon/khlCdbEXD0Sp/basketball">Basketball</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}
export default App;