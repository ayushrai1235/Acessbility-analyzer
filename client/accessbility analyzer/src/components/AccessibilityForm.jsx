import React, { useState } from 'react';

const AccessibilityForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }
    
    setError('');
    onSubmit(url); // Pass URL to the parent component (Dashboard)
  };

  return (
    <div className="form-container">
      <h2>Enter Website URL to Analyze</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          placeholder="Enter URL (e.g., https://example.com)"
          aria-label="Website URL"
          aria-describedby="url-error"
          className={error ? 'input-error' : ''}
        />
        <button type="submit">Analyze</button>
      </form>
      {error && (
        <p id="url-error" className="error-message">{error}</p>
      )}
      <p className="form-helper-text">
        Enter the full URL of the website you want to analyze for accessibility issues.
      </p>
    </div>
  );
};

export default AccessibilityForm;