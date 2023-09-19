"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var bd = require('../bdconfig.js');
const requireAuth = require('../middleware/requireAuth');
require('dotenv').config();
const jwtUser = require('jsonwebtoken');
const bcrypt = require('bcrypt');
router.get('/', (req, res) => {
    const query = 'SELECT * FROM USUARIO';
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
// Cadastro
router.post('/cadastro', (req, res) => {
    const query = `SELECT * FROM Usuario WHERE emailUsuario = '${req.body.emailUsuario}'`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
                if (err) {
                    console.log("> " + err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                const novoUser = {
                    nomeUsuario: req.body.nomeUsuario,
                    emailUsuario: req.body.emailUsuario,
                    senhaUsuario: hash
                };
                const query = `INSERT INTO USUARIO(nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${novoUser.nomeUsuario}', '${novoUser.emailUsuario}', '${novoUser.senhaUsuario}')`;
                bd.query(query, (err, data) => {
                    if (err) {
                        console.log("> " + err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.status(201).send("Created");
                });
            });
        }
        else {
            res.status(409).send("Email de usuário já cadastrado.");
        }
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
        if (data.recordset[0] == null) {
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
                id: data.recordset[0].idUsuario,
                username: data.recordset[0].nomeUsuario,
                email: data.recordset[0].emailUsuario
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
router.put('/atualizar/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM USUARIO WHERE idUsuario = ${idUsuario}`;
    bd.query(query, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordsets.length == 0) {
            res.status(404).send('Not found');
            return;
        }
    });
    const query2 = `SELECT * FROM Usuario WHERE emailUsuario = '${req.body.emailUsuario}'`;
    bd.query(query2, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
                if (err) {
                    console.log("> " + err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                const novosDadosuser = {
                    nomeUsuario: req.body.nomeUsuario,
                    emailUsuario: req.body.emailUsuario,
                    senhaUsuario: hash
                };
                const query2 = `UPDATE USUARIO SET nomeUsuario = '${novosDadosuser.nomeUsuario}', emailUsuario = '${novosDadosuser.emailUsuario}', senhaUsuario = '${novosDadosuser.senhaUsuario}' WHERE idUsuario = ${idUsuario}`;
                bd.query(query2, (err) => {
                    if (err) {
                        console.log("> " + err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.status(201).send("Updated");
                });
            });
        }
        else {
            res.status(409).send("Email de usuário já cadastrado.");
        }
    });
});
router.delete('/delete/:idUsuario', (req, res) => {
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
        const query2 = `DELETE FROM InfoUsuario WHERE idUsuario = ${idUsuario}`;
        bd.query(query2, (err) => {
            if (err) {
                console.log("> " + err);
                res.status(500).send('Internal Server Error');
                return;
            }
        });
        const query3 = `DELETE FROM USUARIO WHERE idUsuario = ${idUsuario}`;
        bd.query(query3, (err) => {
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
