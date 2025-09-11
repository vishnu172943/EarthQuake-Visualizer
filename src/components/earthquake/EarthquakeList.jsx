import React, { useMemo } from 'react';
import NoResults from '../common/NoResults';
import { getMarkerColor, calculateDistance } from '../../utils/mapUtils';
import './EarthquakeList.css';

const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const EarthquakeList = ({ earthquakes, onEarthquakeClick, userLocation }) => {
    const sortedEarthquakes = useMemo(() => {
        return [...earthquakes].sort((a, b) => b.properties.mag - a.properties.mag);
    }, [earthquakes]);

    if (earthquakes.length === 0) {
        return (
            <div className="list-view">
                <div className="list-header"><h3>Earthquakes List</h3></div>
                <NoResults filters={{ minMagnitude: 0 }} />
            </div>
        );
    }

    return (
        <div className="list-view">
            <div className="list-header">
                <h3>Earthquakes (Sorted by Magnitude)</h3>
                <span className="list-count">{earthquakes.length} earthquakes</span>
            </div>
            <div className="earthquake-list" role="list">
                {sortedEarthquakes.map((earthquake) => {
                    const { mag, place, time, felt } = earthquake.properties;
                    const [lng, lat, depth] = earthquake.geometry.coordinates;
                    const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng).toFixed(0) : null;

                    return (
                        <div key={earthquake.id} className="earthquake-item" onClick={() => onEarthquakeClick(earthquake)} role="listitem" tabIndex="0">
                            <div className="earthquake-mag" style={{ backgroundColor: getMarkerColor(mag) }}>
                                {mag.toFixed(1)}
                            </div>
                            <div className="earthquake-details">
                                <div className="earthquake-place">{place}</div>
                                <div className="earthquake-meta">
                                    {formatDateTime(time)} • Depth: {depth.toFixed(1)} km
                                    {felt > 0 && ` • ${felt} felt reports`}
                                    {distance && ` • ${distance} km away`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EarthquakeList;