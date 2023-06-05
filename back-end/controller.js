// Importamos nuestro modelo de Vuelos
const Flight = require("./flight.schema");

/**
 * Flight Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlights = async (req, res) => {
    try {
        // Aquí realizamos la operación de obtener los vuelos que cumplen con los criterios de búsqueda
        const flights = await Flight.find({
            AIRLINE: "WA",
            ORIGIN_AIRPORT: "OGG",
            DESTINATION_AIRPORT: "HNL",
            DEPARTURE_DATE: new Date("2023-01-01T14:45:00.000Z")
        });

        // Devolvemos el resultado
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
