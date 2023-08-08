"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const sql = require('mssql');
const sqlConfig = {
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
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};
function connectar() {
    try {
        sql.connect(sqlConfig);
        console.log("API Conectada com sucesso!");
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = sql, connectar();
