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


/**
 * leggo gli url di tutte le auto già presenti in cars-specs.json e li elimino da urls[] 
 */
let jsonData = [];
try {

    console.log("> leggo il file cars-specs.json...");
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

// /**
//  * la funzione di scrape parte una volta ogni tot secondi per evitare ban da parte del server del sito
//  */
// function ricorsiva(urls, startindex) {
    
//     console.time("scrape execution"); // ti mostra quanto dura l'estrazione di una singola auto

//     scrape(urls[startindex])
//     .then((data) => {
//         let jsonData = []; // creo un jsonData che è un array vuoto
    
//         try {
    
//             const fileData = fs.readFileSync("cars-specs.json", "utf8"); // se esiste, leggo il cars-specs.json
//             jsonData = JSON.parse(fileData); // convert JavaScript values to and from the JavaScript Object Notation (JSON) format
    
//         } catch (err) {
    
//             if (err.code !== "ENOENT") {
//                 console.log("Errore nella lettura del file: " + err.message);
//             } else {
//                 console.log("> il file non esiste, creo il file...");
//                 fs.writeFileSync("cars-specs.json", "[]", { flag: "w" }); // se il file cars-specs.json non esiste, lo creo, con un array vuoto al suo interno
//             }
//         }
    
//         console.log(`> aggiungo ${data["Marca"]} ${data["Modello"]} ${data["Inizio produzione"]} al file cars-specs.json...`);
    
//         jsonData.push(data);
//         fs.writeFileSync("cars-specs.json", JSON.stringify(jsonData, null, 2), { flag: "w" }); // aggiungo al cars-specs.json il nuovo oggetto
    
//     })
//     .then(() => {

//         // quando finisce l'array di urls finisce anche l'esecuzione periodica di scrape()
//         if(startindex !== urlsFinalIndex) {

//             startindex++;

//             setTimeout(() => {

//                 console.timeEnd("scrape execution");
//                 ricorsiva();
                
//             }, Math.round(Math.random() * 7000) + 8000);

//         } else {
//             console.log("> scraping eseguito con successo!")
//             return;
//         }
//     })
//     .catch((err) => {
    
//         console.log("Errore: " + err.message);
//     });
// }
