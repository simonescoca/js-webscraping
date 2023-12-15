const fs = require("fs");
const path = require("path");
const brands = require("../input/brands"); // importo il file di input degli URLs
const ricorsiva = require("./utils/functions/ricorsiva"); // importo la funzione ricorsiva

/**
 * da brands.js mi prendo tutti gli url e li pusho dentro urls[]
 */
const urls = [];
brands.forEach((brand) => {
    brand.models.forEach((model) => {
        model.urls.forEach((url) => {
            urls.push(url);
        });
    });
});

try {
    fs.readdirSync("./output", "utf-8");

} catch (err) {

    console.log("> la folder ./output non esiste, la creo...");
    fs.mkdirSync("./output");
}

/**
 * leggo gli url di tutte le auto già presenti in cars-specs.json e li elimino da urls[] 
 */
let jsonData = [];
try {

    console.log("> leggo il file output/cars-specs.json...");
    const fileData = fs.readFileSync(path.join("./output", "cars-specs.json"), "utf8"); // se esiste, leggo il cars-specs.json
    jsonData = JSON.parse(fileData); // convert JavaScript values to and from the JavaScript Object Notation (JSON) format

    console.log("> elimino gli url delle auto già presenti in cars-specs.json dalla lista delle auto da scaricare...");

    jsonData.forEach((car) => {
        if(urls.includes(car.url)) urls.splice(urls.indexOf(car.url), 1);
    });

} catch (err) {
    if (err.code !== "ENOENT") console.log("Errore nella lettura del file cars-specs.json: " + err.message);
}


ricorsiva(urls, 0, (urls.length - 1));