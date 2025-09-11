import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import { useUserLocation } from './hooks/useUserLocation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Filters from './components/earthquake/Filters';
import Stats from './components/earthquake/Stats';
import EarthquakeMap from './components/earthquake/EarthquakeMap';
import EarthquakeList from './components/earthquake/EarthquakeList';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import { TECTONIC_PLATES_URL } from './utils/constants';
import './App.css'; // Import styles for this component

const App = () => {
    const mapRef = useRef(null);
    const { earthquakes, loading, error, refetch, timeRange, setTimeRange } = useEarthquakeData('all_day');
    const { userLocation, locationError } = useUserLocation();
    const [viewMode, setViewMode] = useLocalStorage('viewMode', 'map');
    const [filters, setFilters] = useLocalStorage('filters', {
        minMagnitude: 0,
        depthRange: 'all'
    });
    const [showPlates, setShowPlates] = useLocalStorage('showPlates', false);
    const [platesData, setPlatesData] = useState(null);
    const [platesLoading, setPlatesLoading] = useState(false);

    const debouncedMinMagnitude = useDebounce(filters.minMagnitude, 250);

    useEffect(() => {
        if (showPlates && !platesData) {
            setPlatesLoading(true);
            fetch(TECTONIC_PLATES_URL)
                .then(res => res.json())
                .then(data => setPlatesData(data))
                .catch(err => {
                    console.error('Failed to load tectonic plates:', err);
                    setShowPlates(false);
                })
                .finally(() => setPlatesLoading(false));
        }
    }, [showPlates, platesData, setShowPlates]);

   // src/App.jsx

const filteredEarthquakes = useMemo(() => {
    return earthquakes.filter(eq => {
        const mag = eq.properties.mag;
        // Add this check to ensure magnitude is a valid number
        if (mag === null || mag === undefined) {
            return false;
        }
        const depth = eq.geometry.coordinates[2];
        if (mag < debouncedMinMagnitude) return false;
        if (filters.depthRange !== 'all') {
            if (filters.depthRange === 'shallow' && depth > 70) return false;
            if (filters.depthRange === 'intermediate' && (depth <= 70 || depth > 300)) return false;
            if (filters.depthRange === 'deep' && depth <= 300) return false;
        }
        return true;
    });
}, [earthquakes, debouncedMinMagnitude, filters.depthRange]);
    const handleEarthquakeClick = (earthquake) => {
        const [lng, lat] = earthquake.geometry.coordinates;
        setViewMode('map');
        setTimeout(() => {
            if (mapRef.current) {
                mapRef.current.setView([lat, lng], 8);
            }
        }, 100);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="app">
            <Header />
            <nav className="controls" role="navigation" aria-label="Main controls">
                <div className="time-range-selector" role="group" aria-label="Time range selection">
                    <label id="time-range-label">Time Range:</label>
                    <div>
                        <button className={timeRange === 'all_hour' ? 'active' : ''} onClick={() => setTimeRange('all_hour')}>Hour</button>
                        <button className={timeRange === 'all_day' ? 'active' : ''} onClick={() => setTimeRange('all_day')}>Day</button>
                        <button className={timeRange === 'all_week' ? 'active' : ''} onClick={() => setTimeRange('all_week')}>Week</button>
                        <button className={timeRange === 'all_month' ? 'active' : ''} onClick={() => setTimeRange('all_month')}>Month</button>
                    </div>
                </div>
                <div className="view-toggles" role="group" aria-label="View mode selection">
                    <button className={viewMode === 'map' ? 'active' : ''} onClick={() => setViewMode('map')}>🗺️ Map</button>
                    <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>📋 List</button>
                </div>
                <button className="refresh-btn" onClick={refetch}>🔄 Refresh</button>
            </nav>
            <Filters filters={filters} onFilterChange={setFilters} />
            <Stats earthquakes={filteredEarthquakes} />
            <main>
                {viewMode === 'map' ? (
                    <EarthquakeMap
                        mapRef={mapRef}
                        earthquakes={filteredEarthquakes}
                        userLocation={userLocation}
                        filters={filters}
                        showPlates={showPlates}
                        setShowPlates={setShowPlates}
                        platesData={platesData}
                        platesLoading={platesLoading}
                    />
                ) : (
                    <EarthquakeList
                        earthquakes={filteredEarthquakes}
                        onEarthquakeClick={handleEarthquakeClick}
                        userLocation={userLocation}
                    />
                )}
            </main>
            <Footer
                filteredCount={filteredEarthquakes.length}
                totalCount={earthquakes.length}
                locationError={locationError}
            />
        </div>
    );
};

export default App;