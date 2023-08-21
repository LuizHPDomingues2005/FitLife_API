"use strict";
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
// getAll
router.get('/get/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM InfoUsuario WHERE idUsuario = ${idUsuario}`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(400).send('Bad Request');
            return;
        }
        if (data.recordsets == 0) {
            res.status(404).send('Not Found');
            return;
        }
        res.status(200).send(data.recordsets[0]);
    });
});
router.post('/cadastro', (req, res) => {
    const infoUser = {
        idUsuario: req.body.idUsuario,
        pesoKg: req.body.peso,
        idade: req.body.idade,
        genero: req.body.genero,
        alturaCm: req.body.altura
    };
    const query = `INSERT INTO InfoUsuario 
        (idUsuario, pesoKg, idade, genero, alturaCM)
        values 
        (${infoUser.idUsuario}, 
        ${infoUser.pesoKg}, 
        ${infoUser.idade}, 
        '${infoUser.genero}', 
        ${infoUser.alturaCm})`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send("Created");
    });
});
module.exports = router;
