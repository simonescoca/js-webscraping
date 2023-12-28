const checkInput = require("../functions/checkInput");
const getInputInfo = require("../functions/getInputInfo");
const cleanOutput = require("../functions/cleanOutput");
const scrape = require("../functions/scrape");
const readJson = require("../functions/readJson");
const getProcessTime = require("../functions/getProcessTime");
const _dirproj = require("../utils/dirproj");


console.log("> controllo l'input...");
if(checkInput()) {
    
    const brands = readJson(`${_dirproj}/input/brands.json`);

    const info = getInputInfo(brands);
    console.log(`> info: { brands: ${info.brands}, models: ${info.models}, versions: ${info.versions} }`);

    if(info.brands > 0 && info.models > 0 && info.versions > 0) {
        console.log("> input verificato, pulisco l'output...");
        cleanOutput();

        let processTime = getProcessTime(info.versions);
        processTime = `${processTime.days}d, ${processTime.hours}h, ${processTime.minutes}m`;

        console.log(`> eseguo lo scrape di ${info.versions} elementi, tempo stimato: ${processTime} circa`);

        const filename = "cars";
        console.log(`\n> scrivo il file 'output/${filename}.json'`);

        scrape(
            brands,
            0,
            brands.length - 1,
            0,
            brands[0].models.length - 1,
            0,
            brands[0].models[0].versions.length - 1,
            0,
            filename
        );

    } else console.log("> input non idoneo");

} else console.log("> l'input non esiste");