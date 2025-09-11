import React from 'react';
import './MapControls.css';

const MapControls = ({ onZoomToFit, onWorldView, hasEarthquakes }) => {
    return (
        <div className="map-controls">
            <button
                className="control-btn"
                onClick={onZoomToFit}
                disabled={!hasEarthquakes}
                title={hasEarthquakes ? "Zoom to show all earthquakes" : "No earthquakes to show"}
            >
                🎯 Zoom to Fit
            </button>
            <button
                className="control-btn"
                onClick={onWorldView}
                title="Reset to world view"
            >
                🌍 World View
            </button>
        </div>
    );
};

export default MapControls;