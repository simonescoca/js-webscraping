const puppeteer = require('puppeteer');

async function scrape (url) {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url);

    const tableRows = await page.$$('.datagrid > tbody > tr');

    const data = {};
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
        "autonomia motore elettrico"
    ];

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