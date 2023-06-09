const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  AIRLINE: {
    type: String,
    required: true,
  },
  FLIGHT_NUMBER: {
    type: Number,
    required: true,
  },
  ORIGIN_AIRPORT: {
    type: String,
    required: true,
  },
  DESTINATION_AIRPORT: {
    type: String,
    required: true,
  },
  CANCELLED: {
    type: Boolean,
    required: true,
  },
  DEPARTURE_DATE: {
    type: Date,
    required: true,
  },
  ARRIVAL_DATE: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Flight', flightSchema);
