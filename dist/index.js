"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importamos as bibliotecas necessárias
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
// criamos uma instancia de aplicativo express
const app = express();
// necessários para suportar tipo json
app.use(bodyParser.json());
// necessário para url
app.use(bodyParser.urlencoded({ extended: false }));
// rotas
app.use('/api', routes_1.Routes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});
