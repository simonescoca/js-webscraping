const puppeteer = require('puppeteer');

/**
 * La funzione serve a fare del webscraping mirato a tirare giù i dati tecnici delle automobili nel sito di automoto.it
 * @param {string} url accetta un url qualsiasi del sito di automoto contenente una scheda tecnica di automobile 
 * @returns {object} che contiene le key-value con i dati presi dalla tabella della scheda tecnica
 */
async function scrape (url) {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url);

    const tableRows = await page.$$('.datagrid > tbody > tr');

    const data = {}; // inizializzo un oggetto "data" vuoto
    data["url"] = url; // pusho in data l'url da dove provengono i dati

    /**
     * Definisco quali sono le key dei dati che voglio considerare
     */
    const acceptableKeys = [
        "marca",
        "modello",
        "prezzo",
        "inizio produzione",
        "fine produzione",
        "carrozzeria",
        "porte",
        "posti",
        "bagagliaio",
        "capacità serbatoio",
        "massa in ordine di marcia",
        "lunghezza",
        "larghezza",
        "altezza",
        "passo",
        "motore",
        "cilindrata",
        "alimentazione",
        "potenza max/regime",
        "coppia massima",
        "trazione",
        "cambio",
        "marce",
        "velocità max",
        "accelerazione 0-100km/h",
        "emissioni co2",
        "omologazione antinquin.",
        "urbano",
        "extraurbano",
        "misto",
        "consumo combinato",
        "tipo ibrido",
        "potenza (termico + elettrico)",
        "coppia (termico + elettrico)",
        "massa rimorchiabile max",
        "autonomia motore elettrico",
        "potenza massima",
        "potenza di picco"
    ];

    /**
     * Per ogni tabella della pagina web dell'url fornito mi prendo il testo contenuto nei th, contenitori delle key e il testo dei td, contenitori dei values
     * Uso la regex e trim() per pulire le stringhe in ingresso
     * Eseguo un controllo sulle key e, se rientrano nelle accettabili, le pusho in data
     */
    for(const tableRow of tableRows) {
        const th = await page.evaluate(element => element.querySelector('th').textContent, tableRow);
        const td = await page.evaluate(element => element.querySelector('td').textContent, tableRow);

        const key = th.replace(/\s{2,}/g, ' ').trim();
        const value = td.replace(/\s{2,}/g, ' ').trim();

        if(acceptableKeys.includes(key.toLowerCase())) {
            data[key] = value;
        };
    }

    await browser.close();
    return data;
};

module.exports = scrape;