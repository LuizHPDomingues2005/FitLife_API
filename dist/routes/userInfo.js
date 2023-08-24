"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (data.recordset[0] == null) {
            res.status(404).send('Not Found');
            return;
        }
        res.status(200).send(data.recordsets[0]);
    });
});
router.post('/cadastro', (req, res) => {
    const novoInfoUser = {
        idUsuario: req.body.idUsuario,
        pesoKg: req.body.peso,
        idade: req.body.idade,
        genero: req.body.genero,
        alturaCm: req.body.altura
    };
    const query = `INSERT INTO InfoUsuario 
        (idUsuario, pesoKg, idade, genero, alturaCM)
        values 
        (${novoInfoUser.idUsuario}, 
        ${novoInfoUser.pesoKg}, 
        ${novoInfoUser.idade}, 
        '${novoInfoUser.genero}', 
        ${novoInfoUser.alturaCm})`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.put('/atualizar/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM USUARIO WHERE idUsuario = ${idUsuario}`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            res.status(404).send('Not found');
            return;
        }
    });
    const novoInfoUser = {
        pesoKg: req.body.peso,
        idade: req.body.idade,
        genero: req.body.genero,
        alturaCm: req.body.altura
    };
    const query2 = `UPDATE InfoUsuario SET
        pesoKg = ${novoInfoUser.pesoKg}, 
        idade = ${novoInfoUser.idade}, 
        genero = '${novoInfoUser.genero}', 
        alturaCM = ${novoInfoUser.alturaCm} 
        WHERE idUsuario = ${idUsuario}`;
    console.log(query2);
    bd.query(query2, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Updated");
    });
});
module.exports = router;
