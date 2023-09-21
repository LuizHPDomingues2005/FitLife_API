"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/:idPlanoAlimentacao', (req, res) => {
    const idPlanoAlimentacao = req.params.idPlanoAlimentacao;
    const query = `SELECT * FROM AlimentacaoCardapio WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
    const novoAlimentacaoCardapio = {
        idPlanoAlimentacao: req.body.idPlanoAlimentacao,
        idCardapio: req.body.idCardapio
    };
    const query = `INSERT INTO AlimentacaoCardapio 
        (idPlanoAlimentacao, idCardapio)
        values 
        (${novoAlimentacaoCardapio.idPlanoAlimentacao},
         ${novoAlimentacaoCardapio.idCardapio})`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.delete('/delete/:idAlimentacaoCardapio', (req, res) => {
    const idAlimentacaoCardapio = req.params.idAlimentacaoCardapio;
    const query = `SELECT * FROM AlimentacaoCardapio WHERE idAlimentacaoCardapio = ${idAlimentacaoCardapio}`;
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
        const query2 = `DELETE FROM Cardapio WHERE idAlimentacaoCardapio = ${idAlimentacaoCardapio}`;
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
