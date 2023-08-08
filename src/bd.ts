import { connect } from "http2"

require('dotenv').config()

const sql = require('mssql')

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
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

function connectar(){
  try {
    sql.connect(sqlConfig)
    console.log("Banco de Dados conectado com sucesso!")
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = sql, connectar();
