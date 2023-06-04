const mongoose = require('mongoose');

async function createConnection() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/flightDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connection established...');
        return db.connection;
    } catch (err) {
        console.error('Error establishing DB connection:', err);
    }
}

async function closeConnection() {
    try {
        await mongoose.connection.close();
        console.log('DB Connection closed...');
    } catch (err) {
        console.error('Error closing DB connection:', err);
    }
}

module.exports = {
    createConnection,
    closeConnection,
};
