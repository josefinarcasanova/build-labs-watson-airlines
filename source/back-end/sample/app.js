const prompt = require('prompt-sync')();

//sample schema test
const Flights = require("./Flights.schema");
const Airlines = require("./Airlines.schema");
const Airports = require("./Airports.schema");


//connection to mongo
const path = require("path");
const mongoose = require('mongoose');
const mongo = require("./mongodb");

async function sample_schema() {
    console.log("query")
    console.log(await Sample.findOne({ AIRLINE: "US" }));

    console.log("fin query")

}

//Returns a list with all the documents in the Airlines collection in the database
async function associatedAirlines() {
    return await Airlines.find({});
}

//
function aboutWatsonAirlines() {
    return "Watson Airlines is a one of the largest airlines in America. With over 30 years of history, we connect people to opportunities while expanding the understanding of our planet and the people within it. We offer our one-of-a-kind value and Hospitality at over 50 airports across more than 15 countries. In addition, we are members of the International Air Transport Association (IATA), a trade association that represents over 300 airlines, equivalent to about 83% of total air traffic. This allows us to operate safely, securely, efficiently, and economically under clearly defined rules."
}

//Returns a list with all the documents in the flights collection in the database that matches the Origin Airport, the Destination Airport and the Departure Date passed trough the parameters
async function SearchForFlights(originAirport, destinationAirport, departureDate) {
    const startDate = new Date(departureDate);
    const endDate = new Date(new Date(departureDate).setDate(startDate.getDate() + 1));
    return await Flights.find({
        ORIGIN_AIRPORT: originAirport,
        DESTINATION_AIRPORT: destinationAirport,
        DEPARTURE_DATE: {
            $gte: startDate,
            $lt: endDate,
        }
    });
}


//returns information about the flight wich id matches flightID 
async function requestFlightInformation(flightID) {
    return await Flights.findById( flightID );
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

    const queriesPromise = new Promise((resolve, reject) => {
        SearchForFlights("SFO", "DFW", "2023-01-01")
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        //Prints in console the list of associated airlines
        console.log("List of Associated Airlines:")
        associatedAirlines()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        requestFlightInformation('63e53b3d123da255099f26c2')
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    });


    //console.log(aboutWatsonAirlines());
}

main();