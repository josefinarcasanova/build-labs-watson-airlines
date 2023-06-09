const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    IATA_CODE: String,
    AIRLINE: String,
});

const Airline = mongoose.model("Airline", airlineSchema);

module.exports = Airline;
