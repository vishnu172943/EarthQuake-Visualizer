import React from 'react';
import './Filters.css';

const Filters = ({ onFilterChange, filters }) => {
    return (
        <div className="filters-container">
            <div className="filter-group">
                <label htmlFor="magnitude-slider">
                    Min. Magnitude: {filters.minMagnitude}
                </label>
                <input
                    id="magnitude-slider"
                    type="range"
                    min="0"
                    max="8"
                    step="0.5"
                    value={filters.minMagnitude}
                    onChange={(e) => onFilterChange({ ...filters, minMagnitude: parseFloat(e.target.value) })}
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