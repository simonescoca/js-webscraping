const puppeteer = require('puppeteer');
const fs = require('fs');

// const indirizzo = 'https://www.automoto.it/catalogo/mini/mini/20-john-cooper-works/157770';
const indirizzo = 'https://www.automoto.it/catalogo/audi/r8-coupe/52-fsi-quattro-s-tronic-plus/123864';

scrape(indirizzo)
    .then((data) => {
        let jsonData = [];

        try {
            console.log('> leggo il file cars-specs.json...')
            const fileData = fs.readFileSync('cars-specs.json', 'utf8');
            jsonData = JSON.parse(fileData);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.log('Errore nella lettura del file:', err.message);
            } else {
                console.log('> il file non esiste, creo il file...');
                fs.writeFileSync('cars-specs.json', '[]', { flag: 'w' });
            }
        }

        console.log('> aggiungo il nuovo oggetto con i dati al file cars-specs.json...')
        jsonData.push(data);
        fs.writeFileSync('cars-specs.json', JSON.stringify(jsonData, null, 2), { flag: 'w' });
    })
    .catch((err) => {
        console.log('Errore: ' + err.message);
    });

async function scrape (url) {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto(url);

    const tableRows = await page.$$('.datagrid > tbody > tr');
    const data = {};

    for(const tableRow of tableRows) {
        const th = await page.evaluate(element => element.querySelector('th').textContent, tableRow);
        const td = await page.evaluate(element => element.querySelector('td').textContent, tableRow);

        const key = th.replace(/\s{2,}/g, ' ').trim();
        const value = td.replace(/\s{2,}/g, ' ').trim();

        // if(key.toLowerCase() === 'consumo combinato') break;
        data[key] = value;
    }

    await browser.close();
    return data;
};