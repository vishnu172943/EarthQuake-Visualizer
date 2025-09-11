import { useState, useEffect } from 'react';

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [locationLoading, setLocationLoading] = useState(true);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLocationLoading(false);
                },
                (error) => {
                    setLocationError(error.message);
                    setLocationLoading(false);
                }
            );
        } else {
            setLocationError("Geolocation is not supported");
            setLocationLoading(false);
        }
    }, []);

    return { userLocation, locationError, locationLoading };
};