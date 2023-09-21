import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');


router.get('/get/:idCardapio', (req: Request, res: Response) => {
    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;

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

    const novoCardapio = {
        nomeCardapio: req.body.nomeCardapio,
        periodo     : req.body.periodo
    }

    const query =
        `INSERT INTO Cardapio 
        (nomeCardapio, periodo)
        values 
        ('${novoCardapio.nomeCardapio}',
          ${novoCardapio.periodo})`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});

router.put('/atualizar/:idCardapio', (req: any, res: any) => {

    const idCardapio = req.params.idCardapio;
    const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;

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
        
        const novoCardapio = {
            nomeCardapio: req.body.nomeCardapio,
            periodo     : req.body.periodo
        }
    
    
        const query2 =
        `UPDATE Cardapio SET
        nomeCardapio = '${novoCardapio.nomeCardapio}',
        periodo      =  ${novoCardapio.periodo}
        WHERE idCardapio = ${idCardapio}`;
    
    
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

    router.delete('/delete/:idCardapio', (req: Request, res: Response) => {
        const idCardapio = req.params.idCardapio;
        const query = `SELECT * FROM Cardapio WHERE idCardapio = ${idCardapio}`;
    
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
    
            const query2 = `DELETE FROM Cardapio WHERE idCardapio = ${idCardapio}`;
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