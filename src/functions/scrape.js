const puppeteer = require("puppeteer");
const writeJson = require("./writeJson");
const createDelay = require("./createDelay");
const acceptableKeys = require("../utils/acceptable-keys");


function scrape (brands, brandIndex, brandsFinalIndex, modelIndex, modelsFinalIndex, versionIndex, versionsFinalIndex, errCount, filename) {
    return new Promise(() => {
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

                writeJson(data, filename);


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
                        filename
                    );

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
                        filename
                    );

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
                        filename
                    );
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
                        filename
                    );

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
                            filename
                        );

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
                            filename
                        );

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
                            filename
                        );
                    }
                }
            });
        }, createDelay(1.5, 1.5));
    });
};

module.exports = scrape;