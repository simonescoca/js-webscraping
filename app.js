const scrape = require("./scrape-function");
const fs = require("fs");
const brands = require("./brands");

const urls = [];

brands.forEach((brand) => {
    brand.models.forEach((model) => {
        model.urls.forEach((url) => {
            urls.push(url);
        })
    });
});

const urlsFinalIndex = urls.length - 1;
let index = 0;

const wait = setInterval(() => {

    scrape(urls[index])
    .then((data) => {
        let jsonData = [];
    
        try {
            console.log("> leggo il file cars-specs.json...");
            const fileData = fs.readFileSync("cars-specs.json", "utf8");
            jsonData = JSON.parse(fileData);
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.log("Errore nella lettura del file: " + err.message);
            } else {
                console.log("> il file non esiste, creo il file...");
                fs.writeFileSync("cars-specs.json", "[]", { flag: "w" });
            }
        }
    
        console.log("> aggiungo il nuovo oggetto con i dati al file cars-specs.json...");
        jsonData.push(data);
        fs.writeFileSync("cars-specs.json", JSON.stringify(jsonData, null, 2), { flag: "w" });
    })
    .then(() => {
        if(index === urlsFinalIndex) clearInterval(wait);
        index++;
    })
    .catch((err) => {
        console.log("Errore: " + err.message);
    });

}, 10000);

