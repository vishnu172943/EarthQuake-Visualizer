import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => (
    <div className="error-container" role="alert">
        <div className="error-message">
            <h3>⚠️ Error</h3>
            <p>{message}</p>
            <p className="error-hint">Please try refreshing the page or check your internet connection.</p>
        </div>
    </div>
);

export default ErrorMessage;