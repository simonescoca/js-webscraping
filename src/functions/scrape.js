const puppeteer = require("puppeteer");
const createDelay = require("./createDelay");
const acceptableKeys = require("../utils/acceptable-keys");

/**
 * La funzione serve a fare del webscraping mirato ad una serie di URL contenuti in un json che entra nell'input della funzione.
 * In particolare gli URL portano a pagine web del sito di automoto.it che contengono tabelle con i dati tecnici delle automobili
 */
function scrape (brands, brandIndex, brandsFinalIndex, modelIndex, modelsFinalIndex, versionIndex, versionsFinalIndex, errCount, output = []) {
    return new Promise((resolve) => {
        setTimeout(async() => {

            const browser = await puppeteer.launch({
                headless: "new",
                defaultViewport: false,
                userDataDir: "./tmp"
            });

            const page = await browser.newPage();

            await page.goto(brands[brandIndex].models[modelIndex].versions[versionIndex].url)
            .then(async() => {

                const tableRowsHandlers = await page.$$("table.datagrid > tbody > tr");
            
                const data = {};
            
                /**
                 * Per ogni tabella della pagina web dell'url fornito mi prendo il testo contenuto nei th, contenitori delle key e il testo dei td, contenitori dei values
                 * Uso la regex e trim() per pulire le stringhe in ingresso
                 * Eseguo un controllo sulle key e, se rientrano nelle accettabili, le pusho in data
                 */
                for(const handler of tableRowsHandlers) {
                    const th = await page.evaluate(
                        element => element.querySelector("th").textContent,
                        handler
                    );
            
                    const td = await page.evaluate(
                        element => element.querySelector("td").textContent,
                        handler
                    );
            
                    const key = th.replace(/\s{2,}/g, ' ').trim();
                    const value = td.replace(/\s{2,}/g, ' ').trim();
            
                    if(acceptableKeys.includes(key.toLowerCase())) data[key] = value
                }
            
                await browser.close();
                output.push(data);

                if (brands[brandIndex].models[modelIndex].name.startsWith(brands[brandIndex].name)) {
                    console.log(` + ${brands[brandIndex].models[modelIndex].name} ${brands[brandIndex].models[modelIndex].versions[versionIndex].name}`);

                } else {
                    console.log(` + ${brands[brandIndex].name} ${brands[brandIndex].models[modelIndex].name} ${brands[brandIndex].models[modelIndex].versions[versionIndex].name}`);
                }

                if(versionIndex < versionsFinalIndex) {
                    scrape(
                        brands,
                        brandIndex,
                        brandsFinalIndex,
                        modelIndex,
                        modelsFinalIndex,
                        versionIndex + 1,
                        versionsFinalIndex,
                        errCount,
                        output
                    )
                    .then(() => {
                        resolve(output);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                } else if(modelIndex < modelsFinalIndex) {
                    scrape(
                        brands,
                        brandIndex,
                        brandsFinalIndex,
                        modelIndex + 1,
                        modelsFinalIndex,
                        0,
                        brands[brandIndex].models[modelIndex + 1].versions.length - 1,
                        errCount,
                        output
                    )
                    .then(() => {
                        resolve(output);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                } else if(brandIndex < brandsFinalIndex) {
                    scrape(
                        brands,
                        brandIndex + 1,
                        brandsFinalIndex,
                        0,
                        brands[brandIndex + 1].models.length - 1,
                        0,
                        brands[brandIndex + 1].models[0].versions.length - 1,
                        errCount,
                        output
                    )
                    .then(() => {
                        resolve(output);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                } else {
                    resolve(output);
                }

            })
            .catch(async(err) => {
                await browser.close();

                if(err && errCount < 3) {
                    console.log(`> ${brands[brandIndex].models[modelIndex].versions[versionIndex].url} non raggiungibile, riprovo...`);

                    console.log(
                        `> ${errCount + 1}º tentativo di recupero dati di
                        ${brands[brandIndex].name}
                        ${brands[brandIndex].models[modelIndex].name}
                        ${brands[brandIndex].models[modelIndex].versions[versionIndex].name}...`
                    );

                    scrape(
                        brands,
                        brandIndex,
                        brandsFinalIndex,
                        modelIndex,
                        modelsFinalIndex,
                        versionIndex,
                        versionsFinalIndex,
                        errCount + 1,
                        output
                    )
                    .then(() => {
                        resolve(output);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                } else if (err && errCount === 3) {
                    console.log(
                        `> skippo lo scrape di
                        ${brands[brandIndex].name}
                        ${brands[brandIndex].models[modelIndex].name}
                        ${brands[brandIndex].models[modelIndex].versions[versionIndex].name}...`
                    );
                    
                    if(versionIndex < versionsFinalIndex) {
                        scrape(
                            brands,
                            brandIndex,
                            brandsFinalIndex,
                            modelIndex,
                            modelsFinalIndex,
                            versionIndex + 1,
                            versionsFinalIndex,
                            0,
                            output
                        )
                        .then(() => {
                            resolve(output);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    } else if(modelIndex < modelsFinalIndex) {
                        scrape(
                            brands,
                            brandIndex,
                            brandsFinalIndex,
                            modelIndex + 1,
                            modelsFinalIndex,
                            0,
                            brands[brandIndex].models[modelIndex + 1].versions.length - 1,
                            0,
                            output
                        )
                        .then(() => {
                            resolve(output);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    } else if(brandIndex < brandsFinalIndex) {
                        scrape(
                            brands,
                            brandIndex + 1,
                            brandsFinalIndex,
                            0,
                            brands[brandIndex + 1].models.length - 1,
                            0,
                            brands[brandIndex + 1].models[0].versions.length - 1,
                            0,
                            output
                        )
                        .then(() => {
                            resolve(output);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    } else {
                        resolve(output);
                    }
                }
            });
        }, createDelay(1.5, 1.5));
    });
};

module.exports = scrape;