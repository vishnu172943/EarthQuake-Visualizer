import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend" role="complementary">
            <h4>Magnitude</h4>
            <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#90EE90' }}></span>
                <span>{"< 2.5 (Minor)"}</span>
            </div>
            <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FFFF00' }}></span>
                <span>2.5 - 4.5 (Light)</span>
            </div>
            <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FFA500' }}></span>
                <span>4.5 - 6.0 (Moderate)</span>
            </div>
            <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FF0000' }}></span>
                <span>{"> 6.0 (Strong)"}</span>
            </div>
        </div>
    );
};

export default Legend;