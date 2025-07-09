import React, { useState } from 'react';
import RepoList from './repoList';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchName(userName.trim());
  };

  return (
    <div className="app-container">
      <h2 className="app-title">GitHubリポジトリ検索</h2>
      <form className="app-form" onSubmit={handleSubmit}>
        <input
          type='text'
          value={userName}
          onChange={handleInputChange}
          placeholder='GitHubユーザー名'
          className="app-input"
        />
        <button
          type='submit'
          className="app-button"
        >
          検索
        </button>
      </form>
      <RepoList userName={searchName} />
    </div>
  );
}

export default App;
