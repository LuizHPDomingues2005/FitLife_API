"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importamos as bibliotecas necessárias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
// criamos uma instancia de aplicativo express
const app = express();
// necessários para suportar tipo json
app.use(bodyParser.json());
// necessário para url
app.use(bodyParser.urlencoded({ extended: false }));
// cors
app.use(cors());
//////////////////////////////////////////////////////////////////////
// rotas
app.use('/user', require('./routes/authUser.js'));
app.use('/infouser', require('./routes/userInfo.js'));
app.use('/planoAlimentacao', require('./routes/planoAlimentacao.js'));
app.use('/planoTreino', require('./routes/planoTreino.js'));
app.use('/cardapio', require('./routes/cardapio.js'));
app.use('/exercicio', require('./routes/exercicio.js'));
//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});
