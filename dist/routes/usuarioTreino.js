"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/', (req, res) => {
    const query = `SELECT * FROM UsuarioTreino`;
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
router.get('/get/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM UsuarioTreino WHERE idUsuario = ${idUsuario}`;
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
    const novoUsuarioTreino = {
        idUsuario: req.body.idUsuario,
        idPlanoTreino: req.body.idPlanoTreino
    };
    const query = `INSERT INTO UsuarioTreino 
        (idUsuario, idPlanoTreino)
        values 
        (${novoUsuarioTreino.idUsuario},
         ${novoUsuarioTreino.idPlanoTreino})`;
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
    const query = `SELECT * FROM UsuarioTreino WHERE idUsuario = ${idUsuario}`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            res.status(404).send('Not Found');
            return;
        }
        const novoUsuarioTreino = {
            idPlanoTreino: req.body.idPlanoTreino
        };
        const query2 = `UPDATE UsuarioTreino SET
        idPlanoTreino =  ${novoUsuarioTreino.idPlanoTreino}

        WHERE idUsuario = ${idUsuario}`;
        bd.query(query2, (err) => {
            if (err) {
                console.log("> " + err);
                res.status(500).send('Internal Server Error');
                return;
            }
        });
        res.status(201).send("Updated");
    });
});
module.exports = router;
