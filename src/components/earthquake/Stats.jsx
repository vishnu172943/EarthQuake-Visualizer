import React, { useMemo } from 'react';
import './Stats.css';

const Stats = ({ earthquakes }) => {
    const stats = useMemo(() => {
        const total = earthquakes.length;
        const avg = total > 0
            ? (earthquakes.reduce((sum, eq) => sum + eq.properties.mag, 0) / total).toFixed(2)
            : '0.00';
        const max = total > 0
            ? Math.max(...earthquakes.map(eq => eq.properties.mag)).toFixed(1)
            : '0.0';
        const feltCount = earthquakes.filter(eq => eq.properties.felt > 0).length;
        return { total, avg, max, feltCount };
    }, [earthquakes]);

    return (
        <div className="stats-container">
            <div className="stat-item">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Earthquakes</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{stats.avg}</span>
                <span className="stat-label">Avg Magnitude</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{stats.max}</span>
                <span className="stat-label">Max Magnitude</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{stats.feltCount}</span>
                <span className="stat-label">Felt Reports</span>
            </div>
        </div>
    );
};

export default Stats;