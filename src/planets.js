/**
 * Returns the diameter of the input planet
 * @param {*} planetResponse The planet
 * @returns {number} The diameter of the planet
 */
function getDiameter(planetResponse) {
    return parseInt(planetResponse.data.diameter);
}

/**
 * Checks if the given planet has moutains and a (known) water level above 0
 * @param {*} planetResponse The planet
 * @returns {boolean} true if the planet contains a (known) water level > 0 and has mountains
 */
function hasMountainWaterPlanet(planetResponse) {
    const surface_water = planetResponse.data.surface_water;
    if (!isNaN(surface_water) && parseInt(surface_water) > 0) {
        if (planetResponse.data.terrain.includes("mountains")) {
            return true;
        }
    }
    return false;
}

/**
 * Get the diameter of the planet (else 0) if the planet is *valid* following the second
 * argument of the function
 * @param {*} planetResponse The planet
 * @param {*} validityPlanetCheck Function to check if the planet is valid
 * @returns {number} The diameter of the planet if it is *valid*, else 0
 */
function getPlanetDiameterIfValidElseZero(planetResponse, validityPlanetCheck) {
    if (validityPlanetCheck(planetResponse)) {
        return getDiameter(planetResponse);
    }
    return 0;
}

/**
 * @param {*} planets Array of planets 
 * @returns {number} The sum of diameters of all planets having mountains and a (known) water level
 *          above zero
 */
function getPlanetsDiameterIfMoutainsAndWaterElseZero(planets) {
    return planets.reduce((currentDiameter, planet) => {
        return currentDiameter + getPlanetDiameterIfValidElseZero(planet, hasMountainWaterPlanet);
    }, 0);
}

module.exports = {
    getPlanetsDiameterIfMoutainsAndWaterElseZero,
}