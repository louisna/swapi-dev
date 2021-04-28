/**
 * Prints a message to the console to indicate that an error occured. If the error
 * is a 404 error, it specifies it to the user.
 * Improvement: the error message if it is not a 404 error could be more detailed.
 * @param {*} error 
 */
function errorMessage(error) {
    if (error.response.status == 404) {
        console.log(`${error.config.url} not found`);
    } else {
        console.log("An error occured\n");
    }
}

module.exports = {
    errorMessage,
}