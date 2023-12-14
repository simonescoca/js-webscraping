const fs = require("fs");
const path = require("path");
const scrape = require("./scrape"); // importo la mia funzione di scrape che si serve di puppeteer

/**
 * La funzione ricorsiva() fa partire la funzione scrape() una volta ogni tot, con tot casuale compreso tra 8 e 16 secondi,
 * per evitare ban da parte del server del sito.
 * Inoltre la ricorsiva() si serve del modulo fs per leggere (se esiste) il cars-specs.json e vedere quali auto sono già state scaricate
 * per evitare di ripetere lo scrape.
 * Se il file cars-specs.json non dovesse esistere lo creerà e ci inserirà, sotto forma di oggetti, tutte quelle auto rappresentate da un URL in brands.js
 * @param {Array} urls array contenente tutti gli URL brands.js, tranne gli URL delle auto già scaricate nel cars-specs.json
 * @param {number} startindex l'indice dal quale si comincia a scorrere gli URL dell'array parametro
 */
function ricorsiva(urls, startindex, finalindex) {
    
    console.time("scrape execution"); // ti mostra quanto dura l'estrazione di una singola auto

    scrape(urls[startindex])
    .then((data) => {
        let jsonData = []; // creo un jsonData che è un array vuoto
    
        try {
    
            const fileData = fs.readFileSync(path.join("./output", "cars-specs.json"), "utf8"); // se esiste, leggo il cars-specs.json
            jsonData = JSON.parse(fileData); // convert JavaScript values to and from the JavaScript Object Notation (JSON) format
    
        } catch (err) {
    
            if (err.code !== "ENOENT") {
                console.log("Errore nella lettura del file: " + err.message);
            } else {
                console.log("> il file non esiste, creo il file...");
                fs.writeFileSync(path.join("./output", "cars-specs.json"), "[]", { flag: "w" }); // se il file cars-specs.json non esiste, lo creo
            }
        }
    
        console.log(`\n> aggiungo ${data["Marca"]} ${data["Modello"]} ${data["Inizio produzione"]} in output/cars-specs.json...`);
    
        jsonData.push(data);
        fs.writeFileSync(path.join("./output", "cars-specs.json"), JSON.stringify(jsonData, null, 2), { flag: "w" }); // aggiungo al cars-specs.json il nuovo oggetto
    
    })
    .then(() => {

        // quando finisce l'array di urls finisce anche l'esecuzione periodica di scrape()
        if(startindex !== finalindex) {

            setTimeout(() => {

                console.timeEnd("scrape execution");
                ricorsiva(urls, (startindex + 1), finalindex);
                
            }, Math.round(Math.random() * 7000) + 8000);

        } else {
            console.timeEnd("scrape execution");
            console.log("\n> scraping eseguito con successo!")
            return;
        }
    })
    .catch((err) => {
    
        console.log("Errore: " + err.message);
    });
}

module.exports = ricorsiva;