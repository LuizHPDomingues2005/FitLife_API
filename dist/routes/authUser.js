"use strict";
var router = require('express').Router();
var bd = require('../bdconfig.js');
const requireAuth = require('../middleware/requireAuth');
const bcrypt = require('bcrypt');
const jwtUser = require('jsonwebtoken');
require('dotenv').config();
// Cadastro
router.get('/', (req, res) => {
    const query = 'SELECT * FROM USUARIO';
    bd.query(query, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }
        if (data.recordsets == 0) {
            res.status(404).send('Not Found');
            return;
        }
        res.status(200).send(data.recordsets);
    });
});
router.post('/cadastro', (req, res) => {
    bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const query = `INSERT INTO USUARIO(nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${req.body.nomeUsuario}', '${req.body.emailUsuario}', '${hash}')`;
        bd.query(query, (err, data) => {
            if (err) {
                console.log("> " + err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send("Created");
        });
    });
});
// login
router.post('/login', (req, res) => {
    const query = `SELECT * FROM Usuario WHERE emailUsuario = '${req.body.emailUsuario}'`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.rowCount == 0) {
            res.status(404).send('Not Found');
            return;
        }
        bcrypt.compare(req.body.senhaUsuario, data.recordset[0].senhaUsuario, (err, same) => {
            if (err) {
                console.log("> " + err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (!same) {
                res.status(403).send("Access denied");
                return;
            }
            const user = {
                id: data.recordset[0].idusuario,
                username: data.recordset[0].nomeusuario,
                email: data.recordset[0].emailusuario
            };
            const tok = jwtUser.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            res.status(200).send({
                token: tok,
                user: user
            });
        });
    });
});
router.post('/authorized', requireAuth, (req, res) => {
    res.status(200).send(res.locals.cookie);
});
module.exports = router;
