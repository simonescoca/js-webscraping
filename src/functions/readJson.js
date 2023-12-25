const fs = require("fs");

function readJson(filepath) {
    try {
        const json = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(json);

    } catch (err) {
        console.log(`> errore nella lettura del file ${filepath}`);
    }
}

module.exports = readJson;