const axios = require("axios");
const args_handler = require("./src/args_handler")
const planets = require("./src/planets")
const error_handler = require("./src/error_handler")

const filmID = args_handler.getFilmID();
if (filmID < 0) {
    console.log(`The value of filmID is not valid. Should be an integer`);
    process.exit()
}

// To manipulate axios
// https://medium.com/@jeffrey.allen.lewis/http-requests-compared-why-axios-is-better-than-node-fetch-more-secure-can-handle-errors-better-39fde869a4a6
// Parameters in axios
// https://stackoverflow.com/questions/48748372/passing-path-parameters-in-axios
axios.get(`http://swapi.dev/api/films/${filmID}/`)
.then((response) => {
    let totalDiameter = 0;
    const planetURLs = response.data.planets;
    const planetRequests = planetURLs.map(planet => axios.get(planet));

    // https://stackoverflow.com/questions/54684255/how-do-you-make-axios-get-request-wait/54684366
    // Wait for all requests before processing the output
    axios.all(planetRequests)
    .then(responses => {
        totalDiameter = planets.getPlanetsDiameterIfMoutainsAndWaterElseZero(responses);
        console.log(totalDiameter);
    })
    .catch((error) => {
        error_handler.errorMessage(error);
        process.exit();
    });
})
.catch((error) => {
    error_handler.errorMessage(error);
    process.exit();
});