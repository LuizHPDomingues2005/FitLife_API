"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/', (req, res) => {
    const query = `SELECT * FROM PlanoDeAlimentacao`;
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
router.get('/get/:idPlanoAlimentacao', (req, res) => {
    const idPlanoAlimentacao = req.params.idPlanoAlimentacao;
    const query = `SELECT * FROM PlanoDeAlimentacao WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
    const novoPlanoAlimentacao = {
        nomePlanoAlimentacao: req.body.nomePlanoAlimentacao
    };
    const query = `INSERT INTO PlanoDeAlimentacao 
        (nomePlanoAlimentacao)
        values 
        ('${novoPlanoAlimentacao.nomePlanoAlimentacao}')`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.put('/atualizar/:idPlanoAlimentacao', (req, res) => {
    const idPlanoAlimentacao = req.params.idPlanoAlimentacao;
    const query = `SELECT * FROM PlanoDeAlimentacao WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
        const novoPlanoAlimentacao = {
            nomePlanoAlimentacao: req.body.nomePlanoAlimentacao
        };
        const query2 = `UPDATE PlanoDeAlimentacao SET
        nomePlanoAlimentacao = '${novoPlanoAlimentacao.nomePlanoAlimentacao}'
        WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
router.delete('/delete/:idPlanoAlimentacao', (req, res) => {
    const idPlanoAlimentacao = req.params.idPlanoAlimentacao;
    const query = `SELECT * FROM PlanoDeAlimentacao WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
        const query2 = `DELETE FROM PlanoDeAlimentacao WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;
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
