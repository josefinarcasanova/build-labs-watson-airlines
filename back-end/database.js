const fs = require('fs');
const mongoose = require('mongoose');
const IbmCloudSecretsManagerApiV1 = require('@ibm-cloud/secrets-manager/secrets-manager/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');

async function createConnection() {
    try {
        const secretsManagerService = new IbmCloudSecretsManagerApiV1({
            authenticator: new IamAuthenticator({
                apikey: 'L09rGrUHuHh8JFyNCpOIcYGExEyKgi4Ero_bUn4a7Boi',
            }),
            serviceUrl: 'https://b6e2ceca-06e6-4a6c-9f7b-f0aa8253569a.us-south.secrets-manager.appdomain.cloud'
        });

        let cert = await secretsManagerService.getSecret({
            secretType: 'imported_cert',
            id: '7ae302de-3e81-3853-f490-a7fdd5d21c9c',
        });

        const cert_name = './certificate.pem';
        fs.writeFileSync(cert_name, cert.result.resources[0].secret_data.certificate, (err) => {if (err) throw err;});
        
        const db = await mongoose.connect('mongodb://ibm_cloud_11c382c4_10e2_4852_a725_2c01cf4a5dc0:5a4a4c06224d2c98aef2441757d4214878fbf7659617f486c487579ea2466637@bf25838b-1eab-467f-ba31-038aca6978f4-0.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691,bf25838b-1eab-467f-ba31-038aca6978f4-1.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691,bf25838b-1eab-467f-ba31-038aca6978f4-2.c5km1ted03t0e8geevf0.databases.appdomain.cloud:32691/watson-airlines?authSource=admin&replicaSet=replset', {
            ssl: true,
            sslValidate: false,
            sslCA: cert_name,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection successful.");
        fs.unlinkSync(cert_name);

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
