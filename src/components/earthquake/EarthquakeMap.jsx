import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl, GeoJSON, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Legend from '../map/Legend';
import MapControls from '../map/MapControls';
import NoResults from '../common/NoResults';
import { getMarkerRadius, getMarkerColor, calculateDistance } from '../../utils/mapUtils';
import { USER_ICON } from '../../utils/constants';
import './EarthquakeMap.css';

const MapHandler = ({ mapRef }) => {
    const map = useMap();
    useEffect(() => {
        if (mapRef) mapRef.current = map;
    }, [map, mapRef]);
    return null;
};

const EarthquakeMap = ({ mapRef, earthquakes, userLocation, filters, showPlates, setShowPlates, platesData, platesLoading }) => {
    const handleZoomToFit = () => {
        if (mapRef.current && earthquakes.length > 0) {
            const bounds = earthquakes.map(eq => [eq.geometry.coordinates[1], eq.geometry.coordinates[0]]);
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    };

    const handleWorldView = () => {
        if (mapRef.current) mapRef.current.setView([20, 0], 2);
    };

    const earthquakeMarkers = useMemo(() => {
        return earthquakes.map((earthquake) => {
            const { mag, place, time, felt, cdi, alert, tsunami, url } = earthquake.properties;
            const [lng, lat, depth] = earthquake.geometry.coordinates;
            const distance = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng).toFixed(0) : null;

            return (
                <CircleMarker key={earthquake.id} center={[lat, lng]} radius={getMarkerRadius(mag)} fillColor={getMarkerColor(mag)} color="#000" weight={1} opacity={0.8} fillOpacity={0.6}>
                    <Popup className="earthquake-popup">
                        <div className="popup-content">
                            <h3>Magnitude {mag.toFixed(1)}</h3>
                            <div className="popup-details">
                                <p><strong>📍 Location:</strong> {place}</p>
                                <p><strong>🕐 Time:</strong> {new Date(time).toLocaleString()}</p>
                                <p><strong>📊 Depth:</strong> {depth.toFixed(2)} km</p>
                                {distance && <p><strong>📏 Distance:</strong> {distance} km away</p>}
                                {felt > 0 && <p><strong>👥 Felt Reports:</strong> {felt}</p>}
                                {cdi && <p><strong>💢 Intensity:</strong> {cdi.toFixed(1)} CDI</p>}
                                {tsunami === 1 && <p className="tsunami-warning">⚠️ Tsunami Warning</p>}
                                {alert && <p className="alert-level" style={{backgroundColor: alert}}>🚨 Alert: {alert}</p>}
                                <a href={url} target="_blank" rel="noopener noreferrer" className="details-link">View Full Report →</a>
                            </div>
                        </div>
                    </Popup>
                </CircleMarker>
            );
        });
    }, [earthquakes, userLocation]);

    return (
        <div className="map-container">
            {earthquakes.length === 0 ? (
                <NoResults filters={filters} />
            ) : (
                <MapContainer center={[20, 0]} zoom={2} className="map" zoomControl={false}>
                    <MapHandler mapRef={mapRef} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
                    <ZoomControl position="topright" />
                    <MapControls onZoomToFit={handleZoomToFit} onWorldView={handleWorldView} hasEarthquakes={earthquakes.length > 0} />
                    {showPlates && platesData && <GeoJSON data={platesData} style={{ color: '#ff6b6b', weight: 2, opacity: 0.6, dashArray: '5, 5' }} />}
                    {earthquakeMarkers}
                    {userLocation && (
                        <Marker position={[userLocation.lat, userLocation.lng]} icon={USER_ICON}>
                            <Popup><div className="popup-content"><h3>📍 Your Location</h3></div></Popup>
                        </Marker>
                    )}
                </MapContainer>
            )}
            <Legend />
            <div className="map-overlay-controls">
                <label className="overlay-toggle">
                    <input type="checkbox" checked={showPlates} onChange={(e) => setShowPlates(e.target.checked)} disabled={platesLoading} />
                    <span>{platesLoading ? 'Loading...' : 'Show Tectonic Plates'}</span>
                </label>
            </div>
        </div>
    );
};

export default EarthquakeMap;