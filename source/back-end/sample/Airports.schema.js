const mongoose = require('mongoose');

const Airports_schema = new mongoose.Schema({
  IATA_CODE : String,
  AIRPORT : String,
  CITY : String,
  STATE : String,
  COUNTRY : String,
});

const Airports = mongoose.model("Airports", Airports_schema);

module.exports = Airports;