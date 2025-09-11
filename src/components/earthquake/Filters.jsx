import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, filters }) => {
    // Local state to control the slider's value directly
    const [magnitude, setMagnitude] = useState(filters.minMagnitude);

    // Update the parent component's state only when the local value changes
    useEffect(() => {
        onFilterChange({ ...filters, minMagnitude: magnitude });
    }, [magnitude]);

    // This effect ensures the slider resets if the filters are ever reset from outside
    useEffect(() => {
        setMagnitude(filters.minMagnitude);
    }, [filters.minMagnitude]);

    return (
        <div className="filters-container">
            <div className="filter-group">
                <label htmlFor="magnitude-slider">
                    Min. Magnitude: {parseFloat(magnitude).toFixed(1)}
                </label>
                <input
                    id="magnitude-slider"
                    type="range"
                    min="0"
                    max="8"
                    step="0.1" // A smaller step for smoother sliding
                    value={magnitude}
                    onChange={(e) => setMagnitude(parseFloat(e.target.value))}
                    className="magnitude-slider"
                />
            </div>
            <div className="filter-group">
                <label>Depth Range:</label>
                <div className="depth-buttons">
                    <button className={filters.depthRange === 'all' ? 'active' : ''} onClick={() => onFilterChange({ ...filters, depthRange: 'all' })}>All</button>
                    <button className={filters.depthRange === 'shallow' ? 'active' : ''} onClick={() => onFilterChange({ ...filters, depthRange: 'shallow' })} title="< 70 km">Shallow</button>
                    <button className={filters.depthRange === 'intermediate' ? 'active' : ''} onClick={() => onFilterChange({ ...filters, depthRange: 'intermediate' })} title="70-300 km">Intermediate</button>
                    <button className={filters.depthRange === 'deep' ? 'active' : ''} onClick={() => onFilterChange({ ...filters, depthRange: 'deep' })} title="> 300 km">Deep</button>
                </div>
            </div>
        </div>
    );
};

export default Filters;