
const Flight = require("./flight.schema");

/**
 
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlights = async (req, res) => {
    try {
        
        const flights = await Flight.find({
            AIRLINE: "WA",
            ORIGIN_AIRPORT: "OGG",
            DESTINATION_AIRPORT: "HNL",
            DEPARTURE_DATE: new Date("2023-01-01T14:45:00.000Z")
        });

       
        res.json({
            result: flights
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getFlights,
};
