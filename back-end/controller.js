const { request, response } = require("express");

// Importamos nuestro modelo de Vuelos
const Flight = require("./flight.schema");

/**
 * Flight Controller
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */
const getFlights = async (req = request, res = response) => {
    try {
        // Aquí realizamos la operación de obtener todos los vuelos de nuestra base de datos
        const flights = await Flight.find();

        // Devolvemos el resultado
        res.json({
            result: flights
        });
    } catch (error) {
        res.json({
            status: error.status
        });
    }
};

module.exports = {
    getFlights,
};
