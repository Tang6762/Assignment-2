import React, { useState } from "react";
import "./styles.css";

// --- 1. Data Fetching Function ---
const BASE_URL = "https://api.github.com/search/users";

const searchGitHubUsers = async (query) => 
  {
  if (!query) return [];
  try 
  {
    const response = await fetch(`${BASE_URL}?q=${query}`);
    if (!response.ok) 
    {
      // must handle error states
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items;
  } catch (error) 
  {
    console.error("Error fetching GitHub users:", error);
    throw error;
  }
};

// --- 2. Reusable Component (UserCard) ---
// This component displays the fetched data.
const UserCard = ({ user }) => 
  {
  return (
    <div className="card">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="avatar"
      />
      <div className="info">
        <h3 className="username">{user.login}</h3>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

// --- 3. Main Page Component (GitHubSearchPage) ---
const GitHubSearchPage = () => 
  {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => 
    {
    e.preventDefault();
    if (query.trim() === "") {
      setUsers([]);
      return;
    }
    setLoading(true);
    setError(null);

    try 
    {
      const results = await searchGitHubUsers(query);
      setUsers(results);
    } catch (err) 
    {
      setError(
        "Failed to fetch user data. Check rate limits or network connection."
      );
      setUsers([]);
    } finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>GitHub User Search </h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter GitHub username..."
          className="input-field"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <h3 className="results-header">Results:</h3>

      {loading && <p className="loading-message">Loading profiles...</p>}

      {error && <p className="error-message">Error: {error}</p>}

      {!loading && users.length === 0 && query && (
        <p>No users found for "{query}".</p>
      )}

      <div className="results-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

// --- 4. main App component (Direct Render) ---

const App = () => {
  return <GitHubSearchPage />;
};

export default App;
