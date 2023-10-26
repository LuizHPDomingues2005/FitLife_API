import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');


router.get('/get/', (req: Request, res: Response) => {
    const query = `SELECT * FROM AlimentacaoCardapio`;

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


router.get('/get/:idPlanoAlimentacao', (req: Request, res: Response) => {
    const idPlanoAlimentacao = req.params.idPlanoAlimentacao;
    const query = `SELECT * FROM AlimentacaoCardapio WHERE idPlanoAlimentacao = ${idPlanoAlimentacao}`;

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

    const novoAlimentacaoCardapio = {
        idPlanoAlimentacao: req.body.idPlanoAlimentacao,
        idCardapio        : req.body.idCardapio
    }

    const query =
        `INSERT INTO AlimentacaoCardapio 
        (idPlanoAlimentacao, idCardapio)
        values 
        (${novoAlimentacaoCardapio.idPlanoAlimentacao},
         ${novoAlimentacaoCardapio.idCardapio})`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});

    router.delete('/delete/:idAlimentacaoCardapio', (req: Request, res: Response) => {
        const idAlimentacaoCardapio = req.params.idAlimentacaoCardapio;
        const query = `SELECT * FROM AlimentacaoCardapio WHERE idAlimentacaoCardapio = ${idAlimentacaoCardapio}`;
    
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
    
            const query2 = `DELETE FROM Cardapio WHERE idAlimentacaoCardapio = ${idAlimentacaoCardapio}`;
            bd.query(query2, (err: MSSQLError) => {
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