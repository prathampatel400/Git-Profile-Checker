import React, { useState } from 'react';
import './App.css'; // You can create this CSS file for styling

function App() {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user information', error);
    }
  };

  return (
    <div className="app">
      <div className="user-card">
        <h2>GitHub User Information</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Enter GitHub Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" style={{backgroundColor:"lightblue"}}>Submit</button>
        </form>

        {userInfo && (
          <div className="result">
            <img src={userInfo.avatar_url} alt="Avatar" />
            <p><strong>Username:</strong> {userInfo.login}</p>
            <p><strong>Name:</strong> {userInfo.name ? userInfo.name : 'n/a'}</p>
            <p><strong>Public Repositories:</strong> {userInfo.public_repos}</p>
            <p><strong>Public Gists:</strong> {userInfo.public_gists}</p>
            <p><strong>Profile Created At:</strong> {new Date(userInfo.created_at).toISOString().split('T')[0]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
