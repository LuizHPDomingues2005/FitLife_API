"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/get/', (req, res) => {
    const query = 'SELECT * FROM Cardapio';
    bd.query(query, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }
        if (data.recordset[0] == null) {
            res.status(404).send('Not Found');
            return;
        }
        res.status(200).send(data.recordsets);
    });
});
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
        valorEnergetico: req.body.valorEnergetico,
        carb: req.body.carb,
        proteinas: req.body.proteinas,
        gorduras: req.body.gorduras,
        sodio: req.body.sodio,
        periodo: req.body.periodo
    };
    const query = `INSERT INTO Cardapio 
        (nomeCardapio,
         valorEnergetico,
         carb,
         proteinas,
         gorduras,
         sodio,
         periodo)
        values 
        ('${novoCardapio.nomeCardapio}',
          ${novoCardapio.valorEnergetico},
          ${novoCardapio.carb},
          ${novoCardapio.proteinas},
          ${novoCardapio.gorduras},
          ${novoCardapio.sodio},
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
            valorEnergetico: req.body.valorEnergetico,
            carb: req.body.carb,
            proteinas: req.body.proteinas,
            gorduras: req.body.gorduras,
            sodio: req.body.sodio,
            periodo: req.body.periodo
        };
        const query2 = `UPDATE Cardapio SET
        nomeCardapio = '${novoCardapio.nomeCardapio}',
        valorEnergetico =  ${novoCardapio.valorEnergetico},
        carb            =  ${novoCardapio.carb},
        proteinas       =  ${novoCardapio.proteinas},
        gorduras        =  ${novoCardapio.gorduras},
        sodio           =  ${novoCardapio.sodio},
        periodo         =  ${novoCardapio.periodo}
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
