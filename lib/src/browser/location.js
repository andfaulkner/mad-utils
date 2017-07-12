"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapsApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json';
// TODO UNIT TEST extractCityFromPositionData
/**
 * Extract the current city from the location data returned by gMaps.
 */
var extractCityFromPositionData = function (locData) {
    var city;
    locData.results.find(function (locObj) {
        return locObj.address_components.find(function (addressPt) {
            if (addressPt.types.length === 2
                && addressPt.types.find(function (t) { return t === 'locality'; })
                && addressPt.types.find(function (t) { return t === 'political'; })) {
                city = addressPt.long_name;
                return addressPt.long_name;
            }
            return false;
        });
    });
    return city;
};
// TODO UNIT TEST getCurrentPositionAsync
/**
 * Promisifies the geolocation API.
 */
var getCurrentPositionAsync = function (geolocation) {
    return new Promise(function (resolve, reject) {
        return geolocation.getCurrentPosition(function (res) { return res ? resolve(res) : reject(new Error("Current location not detected")); });
    });
};
// TODO UNIT TEST getCurrentCity
/**
 * Get the current location. Uses the google maps geolocation URL.
 * @param {Geolocation} geolocation - The built-in geolocation API. Pass in explicitly if it's not
 *                                    present at window.navigator.geolocation.
 */
exports.getCurrentCity = function (geolocation) {
    if (geolocation === void 0) { geolocation = window.navigator.geolocation; }
    if (geolocation && typeof geolocation.getCurrentPosition === 'function') {
        return getCurrentPositionAsync(geolocation)
            .then(function (res) {
            var posQueryParams = "latlng=" + res.coords.latitude + "," + res.coords.longitude;
            return fetch(mapsApiUrl + "?" + posQueryParams + "&sensor=true");
        })
            .then(function (posRes) { return posRes.json(); })
            .then(extractCityFromPositionData);
    }
    return new Error('Geolocation not available');
};
//# sourceMappingURL=location.js.map