import { useState, useEffect, useCallback } from 'react';

const API_ENDPOINTS = {
    all_hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
    all_day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    all_week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
    all_month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
};

export const useEarthquakeData = (initialTimeRange = 'all_day') => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState(initialTimeRange);

    const fetchData = useCallback(async (range) => {
        setLoading(true);
        setError(null);

        // Create a controller to abort the request if it takes too long
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

        try {
            const response = await fetch(API_ENDPOINTS[range], {
                signal: controller.signal // Pass the signal to the fetch request
            });

            // If the request completes, clear the timeout
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Failed to fetch earthquake data');
            const jsonData = await response.json();
            setData(jsonData.features);
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('The request took too long. Please try refreshing the page.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(timeRange);
    }, [fetchData, timeRange]);

    return {
        earthquakes: data,
        loading,
        error,
        refetch: () => fetchData(timeRange),
        timeRange,
        setTimeRange
    };
};