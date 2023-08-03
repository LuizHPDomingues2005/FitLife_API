"use strict";
require('dotenv').config({ path: __dirname + '/.env' });
const sql = require('mssql');
const sqlConfig = {
    user: "BD21248",
    password: "luiz05",
    database: "BD21248",
    server: 'regulus.cotuca.unicamp.br',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
console.log(process.env.DB_NAME);
try {
    sql.connect(sqlConfig);
}
catch (err) {
    console.log(err);
}
module.exports = sql;
