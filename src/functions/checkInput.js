const fs = require("fs");
const _dirproj = require("../utils/dirproj");

function checkInput() {
    return fs.existsSync(`${_dirproj}/input/brands.json`);
}

module.exports = checkInput;