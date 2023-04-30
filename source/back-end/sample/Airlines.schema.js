const mongoose = require('mongoose');

const Airlines_schema = new mongoose.Schema({
  IATA_CODE : String,
  AIRLINE : String,
});

const Airlines = mongoose.model("Airlines", Airlines_schema);

module.exports = Airlines;