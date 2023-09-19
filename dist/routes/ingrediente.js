"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Ingrediente';
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
router.get('/get/:idIngrediente', (req, res) => {
    const idIngrediente = req.params.idIngrediente;
    const query = `SELECT * FROM Ingrediente WHERE idIngrediente = ${idIngrediente}`;
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
    const novoIngrediente = {
        nomeIngrediente: req.body.nomeIngrediente,
        valorEnergetico: req.body.valorEnergetico,
        carb: req.body.carb,
        proteinas: req.body.proteinas,
        gorduras: req.body.gorduras,
        sodio: req.body.sodio
    };
    const query = `INSERT INTO Ingrediente 
        (nomeIngrediente,
         valorEnergetico,
         carb,
         proteinas,
         gorduras,
         sodio)
        values 
        ('${novoIngrediente.nomeIngrediente}',
          ${novoIngrediente.valorEnergetico},
          ${novoIngrediente.carb},
          ${novoIngrediente.proteinas},
          ${novoIngrediente.gorduras},
          ${novoIngrediente.sodio})`;
    bd.query(query, (err) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send("Created");
    });
});
router.put('/atualizar/:idIngrediente', (req, res) => {
    const idIngrediente = req.params.idIngrediente;
    const query = `SELECT * FROM Ingrediente WHERE idIngrediente = ${idIngrediente}`;
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
        const novoIngrediente = {
            nomeIngrediente: req.body.nomeIngrediente,
            valorEnergetico: req.body.valorEnergetico,
            carb: req.body.carb,
            proteinas: req.body.proteinas,
            gorduras: req.body.gorduras,
            sodio: req.body.sodio
        };
        const query2 = `UPDATE Ingrediente SET
        nomeIngrediente = '${novoIngrediente.nomeIngrediente}',
        valorEnergetico =  ${novoIngrediente.valorEnergetico},
        carb            =  ${novoIngrediente.carb},
        proteinas       =  ${novoIngrediente.proteinas},
        gorduras        =  ${novoIngrediente.gorduras},
        sodio           =  ${novoIngrediente.sodio}
        WHERE idIngrediente = ${idIngrediente}`;
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
router.delete('/delete/:idIngrediente', (req, res) => {
    const idIngrediente = req.params.idIngrediente;
    const query = `SELECT * FROM Ingrediente WHERE idIngrediente = ${idIngrediente}`;
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
        const query2 = `DELETE FROM Ingrediente WHERE idIngrediente = ${idIngrediente}`;
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
