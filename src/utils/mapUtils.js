export const getMarkerColor = (magnitude) => {
    if (magnitude < 2.5) return '#90EE90';
    if (magnitude < 4.5) return '#FFFF00';
    if (magnitude < 6.0) return '#FFA500';
    return '#FF0000';
};

export const getMarkerRadius = (magnitude) => {
    return Math.max(magnitude * 3, 5);
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};