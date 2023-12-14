# Web Scraping Automoto.it

Questo progetto utilizza Node.js e Puppeteer per effettuare lo scraping di dati tecnici delle automobili dal sito automoto.it

## Requisiti

- Node.js installato sul tuo computer
- Accesso a internet per eseguire lo scraping delle pagine web

## Installazione

1. Clona o scarica questo repository sul tuo computer
2. Apri il terminale e naviga fino alla cartella del progetto
3. Esegui `npm install` per installare le dipendenze

## Utilizzo

1. Aggiungi gli URL delle schede tecniche delle auto di tuo interesse nel file `brands.js` seguendo la struttura fornita
2. Esegui l'applicazione con `node app.js` per iniziare lo scraping dei dati
3. I dati verranno salvati nel file `cars-specs.json`

## Modifica del Codice

- `app.js`: Contiene la logica principale per lo scraping e l'aggiunta dei dati in `cars-specs.json`
- `brands.js`: File per l'organizzazione degli URL delle schede tecniche delle auto per marca e modello
- `scrape-function.js`: Funzione di scraping utilizzata per estrarre dati dalle pagine Automoto.it