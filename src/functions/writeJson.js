const fs = require("fs");
const _dirproj = require("../utils/dirproj");

function writeJson(data, filename) {
    try {
        const jsonData = JSON.stringify(data, null, 4);
        const formattedData = jsonData + ',\n';

        fs.appendFileSync(`${_dirproj}/output/${filename}.json`, formattedData);
    } catch (err) {
        console.log("\n> errore nella scrittura del file", err);
    }
}

module.exports = writeJson;