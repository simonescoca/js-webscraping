const scrape = require("./scrape-function"); // importo la mia funzione di scrape che si serve di puppeteer
const fs = require("fs");
const brands = require("./brands"); // importo il file di input degli URLs

const urls = [];
brands.forEach((brand) => {
    brand.models.forEach((model) => {
        model.urls.forEach((url) => {
            urls.push(url); // prendo tutti gli urls da brands.js e li pusho dentro urls[]
        })
    });
});

const urlsFinalIndex = urls.length - 1; // prendo l'indice dell'ultimo elemento di urls
let startindex = 0;

/**
 * la funzione di scrape parte una volta ogni 10 secondi per evitare ban da parte del server del sito
 */
const wait = setInterval(() => {

    scrape(urls[startindex])
    .then((data) => {
        let jsonData = []; // creo un jsonData che è un array vuoto
    
        try {
            console.log("> leggo il file cars-specs.json...");
            const fileData = fs.readFileSync("cars-specs.json", "utf8"); // se esiste, leggo il cars-specs.json
            jsonData = JSON.parse(fileData); // ! da rivedere
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.log("Errore nella lettura del file: " + err.message);
            } else {
                console.log("> il file non esiste, creo il file...");
                fs.writeFileSync("cars-specs.json", "[]", { flag: "w" }); // se il file cars-specs.json non esiste, lo creo, con un array vuoto al suo interno
            }
        }
    
        console.log("> aggiungo il nuovo oggetto con i dati al file cars-specs.json...");
        jsonData.push(data); // metto dentro all'array jsonData l'oggetto data che ritorna scrape()
        fs.writeFileSync("cars-specs.json", JSON.stringify(jsonData, null, 2), { flag: "w" }); // aggiungo al cars-specs.json il nuovo oggetto
    })
    .then(() => {
        if(startindex === urlsFinalIndex) clearInterval(wait); // quando finisce l'array di urls finisce anche l'esecuzione periodica di scrape()
        startindex++;
    })
    .catch((err) => {
        console.log("Errore: " + err.message);
    });

}, 10000);