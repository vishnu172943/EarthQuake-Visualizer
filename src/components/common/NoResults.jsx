import React from 'react';
import './NoResults.css';

const NoResults = ({ filters }) => (
    <div className="no-results">
        <div className="no-results-content">
            <span className="no-results-icon">🔍</span>
            <h3>No Earthquakes Found</h3>
            <p>No earthquakes match your current filter criteria.</p>
            {filters.minMagnitude > 0 && (
                <p className="no-results-hint">
                    Try lowering the minimum magnitude from {filters.minMagnitude}
                </p>
            )}
        </div>
    </div>
);

export default NoResults;