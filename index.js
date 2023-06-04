const express = require('express');
const path = require('path');

const { getFlights } = require('./back-end/controller.js');

const app = express();
const port = 3000;

// Sirve los archivos estáticos desde la carpeta de tu front-end
app.use(express.static(path.resolve('/Users/guille/build-labs-watson-airlines/front-end')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('/Users/guille/build-labs-watson-airlines/front-end', 'index.html'));
});

// Aquí estableces la ruta /flights para hacer un GET 
app.get('/flights', getFlights); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

