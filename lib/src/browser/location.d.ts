/**
 * Get the current location. Uses the google maps geolocation URL.
 * @param {Geolocation} geolocation - The built-in geolocation API. Pass in explicitly if it's not
 *                                    present at window.navigator.geolocation.
 */
export declare const getCurrentCity: (geolocation?: Geolocation) => Error | Promise<string>;
