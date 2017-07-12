const mapsApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json';

// TODO UNIT TEST extractCityFromPositionData
/**
 * Extract the current city from the location data returned by gMaps.
 */
const extractCityFromPositionData = (locData): string => {
    let city;
    locData.results.find(locObj =>
        locObj.address_components.find(addressPt => {
            if (addressPt.types.length === 2
                && addressPt.types.find(t => t === 'locality')
                && addressPt.types.find(t => t === 'political')
            ) {
                city = addressPt.long_name;
                return addressPt.long_name;
            }
            return false;
        })
    );
    return city;
};


 // TODO UNIT TEST getCurrentPositionAsync
/**
 * Promisifies the geolocation API.
 */
const getCurrentPositionAsync = (geolocation: Geolocation): Promise<any> => {
    return new Promise((resolve, reject) => {
        return geolocation.getCurrentPosition(
            res => res ? resolve(res) : reject(new Error(`Current location not detected`))
        );
    });
};

// TODO UNIT TEST getCurrentCity
/**
 * Get the current location. Uses the google maps geolocation URL.
 * @param {Geolocation} geolocation - The built-in geolocation API. Pass in explicitly if it's not
 *                                    present at window.navigator.geolocation.
 */
export const getCurrentCity = (geolocation = window.navigator.geolocation): Promise<string> | Error => {
    if (geolocation && typeof geolocation.getCurrentPosition === 'function') {
        return getCurrentPositionAsync(geolocation)
            .then(res => {
                const posQueryParams = `latlng=${res.coords.latitude},${res.coords.longitude}`;
                return fetch(`${mapsApiUrl}?${posQueryParams}&sensor=true`)
            })
            .then(posRes => posRes.json())
            .then(extractCityFromPositionData);
    }
    return new Error('Geolocation not available');
};
