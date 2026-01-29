import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }

    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError("User not found.");
      setUser(null);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>GitHub User Finder</h1>
        <p className="subtitle">
          Search a GitHub username to see profile details.
        </p>

        <div className="search-box">
          <input
            type="text"
            name="username"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {!user && !error && (
          <p className="info">
            No user yet. Try searching for <strong>"octocat"</strong>.
          </p>
        )}

        {error && <div className="error">{error}</div>}

        {user && (
          <div className="user-card">
            <img src={user.avatar_url} alt={user.login} />

            <div className="details">
              <h2>{user.name || user.login}</h2>
              <p className="username">@{user.login}</p>

              <div className="stats">
                <span>{user.public_repos} Repos</span>
                <span>{user.followers} Followers</span>
                <span>{user.following} Following</span>
              </div>

              <div className="meta">
                {user.location && <p>📍 {user.location}</p>}
                {user.company && <p>🏢 {user.company}</p>}
                {user.blog && (
                  <a href={user.blog} target="_blank" rel="noreferrer">
                    🔗 {user.blog}
                  </a>
                )}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-link"
                >
                  ❤️ View on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
