"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/:idMusculo', (req, res) => {
    const idMusculo = req.params.idMusculo;
    const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;
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
    const novoMusculo = {
        nomeMusculo: req.body.nomeMusculo
    };
    const query = `INSERT INTO Musculo 
        (nomeMusculo)
        values 
        ('${novoMusculo.nomeMusculo}')`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.put('/atualizar/:idMusculo', (req, res) => {
    const idMusculo = req.params.idMusculo;
    const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;
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
        const novoMusculo = {
            nomeMusculo: req.body.nomeMusculo
        };
        const query2 = `UPDATE Musculo SET
        nomeMusculo = '${novoMusculo.nomeMusculo}'
        WHERE idMusculo = ${idMusculo}`;
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
router.delete('/delete/:idMusculo', (req, res) => {
    const idMusculo = req.params.idMusculo;
    const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;
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
        const query2 = `DELETE FROM Musculo WHERE idMusculo = ${idMusculo}`;
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
