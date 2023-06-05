const express = require('express');
const path = require('path');

const { getFlights } = require('./back-end/controller.js');
const { createConnection } = require('./back-end/database.js');

const app = express();
const port = 3000;

// Sirve los archivos estáticos desde la carpeta de tu front-end
app.use(express.static(path.resolve('/Users/guille/build-labs-watson-airlines/front-end')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('/Users/guille/build-labs-watson-airlines/front-end', 'index.html'));
});

app.get('/flights', getFlights); 

// Nueva ruta para servir el archivo flights.html
app.get('/flights_page', (req, res) => {
    res.sendFile(path.resolve('/Users/guille/build-labs-watson-airlines/front-end', 'flights.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
createConnection().then(() => console.log("Database connected"));
