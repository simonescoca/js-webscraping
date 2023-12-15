/**
 * Array che contiene tutti gli urls da cui l'app tirerà giù i dati
 */
const brands = [
    {
        name: "Abarth",
        models: [
            {
                name: "500e",
                urls: [
                    "https://www.automoto.it/listino/abarth/500e/500e/173466",
                    // "https://www.automoto.it/listino/abarth/500e/500e-scorpionissima/172744",
                    // "https://www.automoto.it/listino/abarth/500e/500e-turismo/173467"
                ]
            },
            // {
            //     name: "500e C",
            //     urls: [
            //         "https://www.automoto.it/listino/abarth/500e-cabrio/500e-c/173468",
            //         "https://www.automoto.it/listino/abarth/500e-cabrio/500e-c-scorpionissima/172745",
            //         "https://www.automoto.it/listino/abarth/500e-cabrio/500e-c-turismo/173469"
            //     ]
            // },
            // {
            //     name: "F595 / C",
            //     urls: [
            //         "https://www.automoto.it/listino/abarth/595/595-14-turbo-t-jet-165-cv/171523",
            //         "https://www.automoto.it/listino/abarth/595-cabrio/595-c-14-turbo-t-jet-165-cv/171524"
            //     ]
            // },
            // {
            //     name: "695 / C",
            //     urls: [
            //         "https://www.automoto.it/listino/abarth/695/695-14-turbo-t-jet-180-cv/171525",
            //         "https://www.automoto.it/listino/abarth/695/695-14-turbo-t-jet-180-cv-mta/171527",
            //         "https://www.automoto.it/listino/abarth/695-cabrio/695-c-14-turbo-t-jet-180-cv/171526",
            //         "https://www.automoto.it/listino/abarth/695-cabrio/695-c-14-turbo-t-jet-180-cv-mta/171528"
            //     ]
            // }
        ]
    },
    {
        name: "Alfa Romeo",
        models: [
            {
                name: "Giulia Competizione / Sprint / Super / Ti / Veloce / Quadrifoglio",
                urls: [
                    "https://www.automoto.it/listino/alfa-romeo/giulia/20-turbo-280-cv-at8-awd-q4-competizione/171847",
                    // "https://www.automoto.it/listino/alfa-romeo/giulia/20-turbo-280-cv-at8-awd-q4-sprint/171842",
                    // "https://www.automoto.it/listino/alfa-romeo/giulia/20-turbo-280-cv-at8-awd-q4-super/171841",
                    // "https://www.automoto.it/listino/alfa-romeo/giulia/20-turbo-280-cv-at8-awd-q4-ti/171839",
                    // "https://www.automoto.it/listino/alfa-romeo/giulia/20-turbo-280-cv-at8-awd-q4-veloce/171836",
                    // "https://www.automoto.it/listino/alfa-romeo/giulia/29-t-v6-at8-quadrifoglio/174271"
                ]
            },
            // {
            //     name: "Stelvio Sprint / Super / Ti / Veloce / Quadrifoglio",
            //     urls: [
            //         "https://www.automoto.it/listino/alfa-romeo/stelvio/stelvio-20-turbo-280-cv-at8-q4-sprint/171856",
            //         "https://www.automoto.it/listino/alfa-romeo/stelvio/stelvio-20-turbo-280-cv-at8-q4-super/171848",
            //         "https://www.automoto.it/listino/alfa-romeo/stelvio/stelvio-20-turbo-280-cv-at8-q4-ti/171850",
            //         "https://www.automoto.it/listino/alfa-romeo/stelvio/stelvio-20-turbo-280-cv-at8-q4-veloce/171852",
            //         "https://www.automoto.it/listino/alfa-romeo/stelvio/stelvio-29-bi-turbo-v6-520-cv-at8-quadrifoglio/174272"
            //     ]
            // }
        ]
    },
    {
        name: "Aston Martin",
        models: [
            {
                name: "DB11",
                urls: [
                    "https://www.automoto.it/listino/aston-martin/db11/db11-v12-amr-coupe/158348",
                    // "https://www.automoto.it/listino/aston-martin/db11/db11-v12-coupe/166280",
                    // "https://www.automoto.it/listino/aston-martin/db11/db11-v8-coupe/157629",
                    // "https://www.automoto.it/listino/aston-martin/db11/db11-v8-volante/157630"
                ]
            },
            {
                name: "DB12",
                urls: [
                    // "https://www.automoto.it/listino/aston-martin/db12/db12-v8-coupe/173893",
                    // "https://www.automoto.it/listino/aston-martin/db12/db12-v8-volante/174530"
                ]
            },
            {
                name: "DBS",
                urls: [
                    // "https://www.automoto.it/listino/aston-martin/dbs/dbs-coupe/166011",
                    // "https://www.automoto.it/listino/aston-martin/dbs/dbs-superleggera-coupe/157518",
                    // "https://www.automoto.it/listino/aston-martin/dbs/dbs-superleggera-volante/157519",
                    // "https://www.automoto.it/listino/aston-martin/dbs/dbs-volante/166012"
                ]
            },
            {
                name: "DBX",
                urls: [
                    // "https://www.automoto.it/listino/aston-martin/dbx/dbx/154784",
                    // "https://www.automoto.it/listino/aston-martin/dbx/dbx707/167635",
                    // "https://www.automoto.it/listino/aston-martin/dbx/dbx707-amr23-edition/173891",
                    // "https://www.automoto.it/listino/aston-martin/dbx/dbx707-amr23-edition-with-q-highlights/173892"
                ]
            },
        ]
    },
];

module.exports = brands;