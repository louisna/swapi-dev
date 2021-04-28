// From https://www.codegrepper.com/code-examples/javascript/js+check+if+string+is+integer
/**
 * Checks if the given film ID is valid (is integer number and greater than zero)
 * @param {*} arg 
 * @returns {boolean} true if valid, false otherwise
 */
function validFilmID(arg) {
    return !isNaN(arg) && Number.isInteger(parseFloat(arg)) && parseInt(arg) > 0;
}

/**
 * @returns {number} filmID if valid, -1 otherwise
 */
function getFilmID() {
    if (process.argv.length != 3) {
        return -1;
    }

    if (!validFilmID(process.argv[2])) {
        return -1;
    }

    return parseInt(process.argv[2]);
}

module.exports = {
    getFilmID,
}