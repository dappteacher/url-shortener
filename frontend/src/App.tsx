import React, { useState } from 'react';
import axios from 'axios';
import copy from 'clipboard-copy';
import './App.css';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url || !/^https?:\/\/\S+$/.test(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/shorten', { url });
      setShortUrl(response.data.shortUrl);
      setError(null);
    } catch (err) {
      setError('Failed to shorten the URL. Please try again.');
      setShortUrl(null);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      copy(shortUrl);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="url-shortener">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL to shorten"
        />
        <button type="submit">Shorten URL</button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="short-url">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
          <button onClick={handleCopy}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default App;