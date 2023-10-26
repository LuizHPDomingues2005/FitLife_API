"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/', (req, res) => {
    const query = `SELECT * FROM TreinoExercicio`;
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
router.get('/get/:idPlanoTreino', (req, res) => {
    const idPlanoTreino = req.params.idPlanoTreino;
    const query = `SELECT * FROM TreinoExercicio WHERE idPlanoTreino = ${idPlanoTreino}`;
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
    const novoTreinoExercicio = {
        idPlanoTreino: req.body.idPlanoTreino,
        idExercicio: req.body.idExercicio
    };
    const query = `INSERT INTO TreinoExercicio 
        (idPlanoTreino, idExercicio)
        values 
        (${novoTreinoExercicio.idPlanoTreino},
         ${novoTreinoExercicio.idExercicio})`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.delete('/delete/:idTreinoExercicio', (req, res) => {
    const idTreinoExercicio = req.params.idTreinoExercicio;
    const query = `SELECT * FROM TreinoExercicio WHERE idTreinoExercicio = ${idTreinoExercicio}`;
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
        const query2 = `DELETE FROM TreinoExercicio WHERE idTreinoExercicio = ${idTreinoExercicio}`;
        bd.query(query2, (err) => {
            if (err) {
                console.log("> " + err);
                res.status(500).send('Internal Server Error');
                return;
            }
        });
        res.status(200).send("Ok");
    });
});
module.exports = router;
