const { Client } = require('mssql');
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: 'regulus.cotuca.unicamp.br',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
});
function connect() {
    client.connect(err => {
        if (err)
            console.log("Conection error > " + err);
    });
}
module.exports = client;
