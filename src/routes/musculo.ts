import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');

router.get('/get/', (req: Request, res: Response) => {
    const query = `SELECT * FROM Musculo`;

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

router.get('/get/:idMusculo', (req: Request, res: Response) => {
    const idMusculo = req.params.idMusculo;
    const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;

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

    const novoMusculo = {
        nomeMusculo: req.body.nomeMusculo
    }

    const query =
        `INSERT INTO Musculo 
        (nomeMusculo)
        values 
        ('${novoMusculo.nomeMusculo}')`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});

router.put('/atualizar/:idMusculo', (req: any, res: any) => {

    const idMusculo = req.params.idMusculo;
    const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;

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
        
        const novoMusculo = {
            nomeMusculo: req.body.nomeMusculo
        }
    
    
        const query2 =
        `UPDATE Musculo SET
        nomeMusculo = '${novoMusculo.nomeMusculo}'
        WHERE idMusculo = ${idMusculo}`;
    
    
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

    router.delete('/delete/:idMusculo', (req: Request, res: Response) => {
        const idMusculo = req.params.idMusculo;
        const query = `SELECT * FROM Musculo WHERE idMusculo = ${idMusculo}`;
    
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
    
            const query2 = `DELETE FROM Musculo WHERE idMusculo = ${idMusculo}`;
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