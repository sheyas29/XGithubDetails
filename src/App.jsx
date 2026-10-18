import { useState } from 'react';
import './App.css';
import UserCard from './components/UserCard';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "No user yet. Try searching for 'octocat'."
  );
  const [error, setError] = useState(false);

  async function searchHandler(e) {
    e?.preventDefault();

    const searchUsername = username.trim();

    // Validate empty input without making an API request.
    if (!searchUsername) {
      setUser(null);
      setError(true);
      setMessage('Please enter a GitHub username.');
      return;
    }

    setLoading(true);
    setError(false);
    setMessage('');

    try {
      const url = `https://api.github.com/users/${encodeURIComponent(
        searchUsername
      )}`;

      const res = await fetch(url);

      if (!res.ok) {
        setUser(null);
        setError(true);

        if (res.status === 404) {
          setMessage('Please enter a GitHub username.');
        } else {
          setMessage('Unable to fetch the user. Please try again.');
        }

        return;
      }

      const data = await res.json();

      const userData = {
        profilePicture: data.avatar_url,
        name: data.name || data.login,
        username: data.login,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        location: data.location,
        company: data.company,
        blogUrl: data.blog,
        githubLink: data.html_url,
      };

      setUser(userData);
      setError(false);
      setMessage('');
    } catch (err) {
      console.error('Error fetching GitHub user:', err);

      setUser(null);
      setError(true);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>GitHub User Finder</h1>

        <p>Search a GitHub username to see profile details.</p>

        <form className="search-form" onSubmit={searchHandler}>
          <input
            type="text"
            name="username"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="GitHub username"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {loading ? (
          <p role="status">Searching...</p>
        ) : user ? (
          <UserCard user={user} />
        ) : error ? (
          <div className="error" role="alert">
            <p>{message}</p>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
