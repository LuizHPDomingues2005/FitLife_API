var router = require('express').Router();
var bd = require('../bdconfig.js');
const requireAuth = require('../middleware/requireAuth')
const bcrypt = require('bcrypt');
const jwtUser = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
// Cadastro

router.get('/', (req: Request, res: Response) => {
    const query = 'SELECT * FROM USUARIO';

    bd.query(query, (err: MSSQLError, data: Data<JSON>) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.recordset[0] == null) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.recordsets);
    });
})


router.post('/cadastro', (req: Request, res: Response) => {

    bcrypt.hash(req.body.senhaUsuario, 10, (err: Error, hash: string) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const query = `INSERT INTO USUARIO(nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${req.body.nomeUsuario}', '${req.body.emailUsuario}', '${hash}')`;

        bd.query(query, (err: MSSQLError) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(201).send("Created");

        })
    });
})




// login

router.post('/login', (req: Request, res: Response) => {
    const query = `SELECT * FROM Usuario WHERE emailUsuario = '${req.body.emailUsuario}'`;


    bd.query(query, (err: MSSQLError, data: Data<any>) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        if (data.recordset[0] == null) {
            res.status(404).send('Not Found');
            return;
        }

        bcrypt.compare(req.body.senhaUsuario, data.recordset[0].senhaUsuario, (err: Error, same: boolean) => {
            if (err) {
                console.log("> " + err)
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
            }

            const tok = jwtUser.sign(JSON.stringify(user), process.env.TOKEN_SECRET);

            res.status(200).send({
                token: tok,
                user: user
            });
        })
    })
})

router.post('/authorized', requireAuth, (req: Request, res: Response) => {
    res.status(200).send(res.locals.cookie);
})

router.put('/atualizar/:idUsuario', (req: Request, res: Response) => {
    const idUsuario = req.params.idUsuario;

    const query = `SELECT * FROM USUARIO WHERE idUsuario = ${idUsuario}`;

    bd.query(query, (err: MSSQLError, data: Data<JSON>) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordsets.length == 0) {
            res.status(404).send('Not found');
            return;

        }
    })


    bcrypt.hash(req.body.senhaUsuario, 10, (err: Error, hash: string) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const novosDadosuser = {
            nomeUsuario: req.body.nomeUsuario,
            emailUsuario: req.body.emailUsuario,
            senhaUsuario: hash
        }

        const query2 = `UPDATE USUARIO SET nomeUsuario = '${novosDadosuser.nomeUsuario}', emailUsuario = '${novosDadosuser.emailUsuario}', senhaUsuario = '${novosDadosuser.senhaUsuario}' WHERE idUsuario = ${idUsuario}`;

        bd.query(query2, (err: MSSQLError) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(201).send("Updated");
        });
    })
})

router.delete('/delete/:idUsuario', (req: Request, res: Response) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM USUARIO WHERE idUsuario = ${idUsuario}`;

    bd.query(query, (err: MSSQLError, data: Data<JSON>) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            res.status(404).send('Not found');
            return;

        }
        const query2 = `DELETE FROM InfoUsuario WHERE idUsuario = ${idUsuario}`;

        bd.query(query2, (err: MSSQLError) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
        })

        const query3 = `DELETE FROM USUARIO WHERE idUsuario = ${idUsuario}`;
        bd.query(query3, (err: MSSQLError) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
        })


        res.status(200).send("Ok");
    })


})

module.exports = router;