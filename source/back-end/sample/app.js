//Schemas
const Flights = require("./Flights.schema");
const Airlines = require("./Airlines.schema");
const Airports = require("./Airports.schema");


//connection to mongo
const path = require("path");
const mongoose = require('mongoose');
const mongo = require("./mongodb");

//Returns a list with all the documents in the Airlines collection in the database
async function associatedAirlines() {
    try {
        const airlines = await Airlines.find({});
        return airlines;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//
function aboutWatsonAirlines() {
    return "Watson Airlines is a one of the largest airlines in America. With over 30 years of history, we connect people to opportunities while expanding the understanding of our planet and the people within it. We offer our one-of-a-kind value and Hospitality at over 50 airports across more than 15 countries. In addition, we are members of the International Air Transport Association (IATA), a trade association that represents over 300 airlines, equivalent to about 83% of total air traffic. This allows us to operate safely, securely, efficiently, and economically under clearly defined rules."
}

//Returns a list with all the documents in the flights collection in the database that matches the Origin Airport, the Destination Airport and the Departure Date passed trough the parameters
async function SearchForFlights(originAirport, destinationAirport, departureDate) {
    const startDate = new Date(departureDate);                                              //Variable with the begining of the search range, its equal to departure date
    const endDate = new Date(new Date(departureDate).setDate(startDate.getDate() + 1));     //Variable with the ending of the search range, its equal to departure date plus onde day

    try {
        const flights = await Flights.find({
            ORIGIN_AIRPORT: originAirport,
            DESTINATION_AIRPORT: destinationAirport,
            DEPARTURE_DATE: {
                $gte: startDate,
                $lt: endDate,
            }
        });
        return flights;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//returns information about the flight wich id matches flightID 
async function requestFlightInformation(flightID) {
    try {
        const flightInfo = await Flights.findById(flightID);
        return flightInfo;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function closeDBConecction() {
    const { close_connection } = require("./mongodb");
    await close_connection();
}

async function main() {
    // Get global variables from .env file
    require("dotenv").config({ path: path.resolve(__dirname, "./../../.env") });

    // Connect to database
    const { create_connection } = require("./mongodb");
    await create_connection();

    //Testing of the queries functions 

    const flights = await SearchForFlights("SFO", "DFW", "2023-01-01");
    console.log(flights);

    console.log("List of Associated Airlines:");
    const associatedAirlnes = await associatedAirlines();
    console.log(associatedAirlnes);

    const flightInformation = await requestFlightInformation('63e53b3d123da255099f26c2');
    console.log(flightInformation);
}

main();