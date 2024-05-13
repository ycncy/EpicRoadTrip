const getLocations = async (locationQuery: String) => {
    const locations = [];
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${locationQuery}&apiKey=257d0478b9874294a278669a17a76c65`)
    const result = await response.json();
    for (const location of result.features) {
        locations.push({
            label: location.properties.formatted,
            position: {
                latitude: location.properties.lat,
                longitude: location.properties.lon,
            }
        })
    }

    return locations;
}

export const locationApiService = {
    getLocations
}