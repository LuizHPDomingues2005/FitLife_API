"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/:idCardapio', (req, res) => {
    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;
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
    const novoCardapio = {
        nomeCardapio: req.body.nomeCardapio,
        periodo: req.body.periodo
    };
    const query = `INSERT INTO Cardapio 
        (nomeCardapio, periodo)
        values 
        ('${novoCardapio.nomeCardapio}',
          ${novoCardapio.periodo})`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.put('/atualizar/:idCardapio', (req, res) => {
    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;
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
        const novoCardapio = {
            nomeCardapio: req.body.nomeCardapio,
            periodo: req.body.periodo
        };
        const query2 = `UPDATE Cardapio SET
        nomeCardapio = '${novoCardapio.nomeCardapio}',
        periodo      =  ${novoCardapio.periodo}
        WHERE idCardapio = ${idCardapio}`;
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
router.delete('/delete/:idCardapio', (req, res) => {
    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;
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
        const query2 = `DELETE FROM Cardapio WHERE idCardapio = ${idCardapio}`;
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
