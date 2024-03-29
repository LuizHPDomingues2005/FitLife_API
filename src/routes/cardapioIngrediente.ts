import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');


router.get('/get/', (req: Request, res: Response) => {
    const query = `SELECT * FROM CardapioIngrediente`;

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


router.get('/get/:idCardapio', (req: Request, res: Response) => {
    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM CardapioIngrediente WHERE idCardapio = ${idCardapio}`;

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

    const novoCardapioIngrediente = {
        idCardapio           : req.body.idCardapio,
        idIngrediente        : req.body.idIngrediente
    }

    const query =
        `INSERT INTO CardapioIngrediente 
        (idCardapio, idIngrediente)
        values 
        (${novoCardapioIngrediente.idCardapio},
         ${novoCardapioIngrediente.idIngrediente})`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});

    router.delete('/delete/:idCardapioIngrediente', (req: Request, res: Response) => {
        const idCardapioIngrediente = req.params.idCardapioIngrediente;
        const query = `SELECT * FROM CardapioIngrediente WHERE idCardapioIngrediente = ${idCardapioIngrediente}`;
    
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
    
            const query2 = `DELETE FROM CardapioIngrediente WHERE idCardapioIngrediente = ${idCardapioIngrediente}`;
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