import React from 'react';
import './Footer.css';

const Footer = ({ filteredCount, totalCount, locationError }) => (
    <footer className="footer" role="contentinfo">
        <p>
            Data: USGS Earthquake Hazards Program |
            Showing {filteredCount} of {totalCount} earthquakes |
            Last updated: {new Date().toLocaleTimeString()}
        </p>
        {locationError && (
            <p className="location-error">📍 Location unavailable: {locationError}</p>
        )}
    </footer>
);

export default Footer;