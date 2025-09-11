import React from 'react';

const ErrorBanner = ({ message, onRetry }) => (
  <div className="error-banner">
    <span>⚠️ {message}</span>
    {onRetry && (
      <button onClick={onRetry} className="retry-btn">
        Retry
      </button>
    )}
  </div>
);

export default ErrorBanner;