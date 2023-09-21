import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');


router.get('/get/:idUsuario', (req: Request, res: Response) => {
    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM UsuarioAlimentacao WHERE idUsuario = ${idUsuario}`;

    bd.query(query, (err: any, data: any) => {
        if (err) {
            console.log("> " + err)
            res.status(400).send('Bad Request');
            return;
        }

        if (data.recordset[0] == null) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.recordsets[0]);
    });
});

router.post('/cadastro', (req: Request, res: Response) => {

    const novoUsuarioAlimentacao = {
        idUsuario          : req.body.idUsuario,
        idPlanoAlimentacao : req.body.idPlanoAlimentacao
    }

    const query =
        `INSERT INTO UsuarioAlimentacao 
        (idUsuario, idPlanoAlimentacao)
        values 
        (${novoUsuarioAlimentacao.idUsuario},
         ${novoUsuarioAlimentacao.idPlanoAlimentacao})`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});


router.put('/atualizar/:idUsuario', (req: any, res: any) => {

    const idUsuario = req.params.idUsuario;
    const query = `SELECT * FROM UsuarioAlimentacao WHERE idUsuario = ${idUsuario}`;

    bd.query(query, (err: MSSQLError, data: Data<JSON>) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        if (data.recordset[0] == null) {
            res.status(404).send('Not Found')
            return;
        }
        
        const novoUsuarioAlimentacao = {
            idPlanoAlimentacao : req.body.idPlanoAlimentacao
        }
    
    
        const query2 =
        `UPDATE UsuarioAlimentacao SET
        idPlanoAlimentacao =  ${novoUsuarioAlimentacao.idPlanoAlimentacao}

        WHERE idUsuario = ${idUsuario}`;
    
    
        bd.query(query2, (err: MSSQLError) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
    
        });
        res.status(201).send("Updated");
    

        })
    });

module.exports = router;