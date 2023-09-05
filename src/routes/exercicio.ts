import { Request, Response, NextFunction } from "express"
import { MSSQLError, IResult as Data } from "mssql"

require('dotenv').config();
var router = require('express').Router();
var bd = require('../bdconfig.js');


// getAll
router.get('/get/', (req: Request, res: Response) => {
    const query = `SELECT * FROM Exercicio`;

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

        res.status(200).send(data.recordsets);
    });
});


router.get('/get/:idExercicio', (req: Request, res: Response) => {
    const idExercicio = req.params.idExercicio;
    const query = `SELECT * FROM Exercicio WHERE idExercicio = ${idExercicio}`;

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

    const novoExercicio = {
        nomeExercicio: req.body.nomeExercicio,
        series       : req.body.series,
        repeticoes   : req.body.repeticoes,
        tempo        : req.body.tempo
    }

    const query =
        `INSERT INTO Exercicio 
        (nomeExercicio, series, repeticoes, tempoS)
        values 
        ('${novoExercicio.nomeExercicio}',
          ${novoExercicio.series},
          ${novoExercicio.repeticoes},
          ${novoExercicio.tempo})`

    bd.query(query, (err: MSSQLError) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        res.status(201).send("Created");

    })
});

router.put('/atualizar/:idExercicio', (req: any, res: any) => {

    const idExercicio = req.params.idExercicio;
    const query = `SELECT * FROM Exercicio WHERE idExercicio = ${idExercicio}`;

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
        
        const novoExercicio = {
            nomeExercicio: req.body.nomeExercicio,
            series       : req.body.series,
            repeticoes   : req.body.repeticoes,
            tempo        : req.body.tempo
        }
    
    
        const query2 =
        `UPDATE Exercicio SET
        nomeExercicio = '${novoExercicio.nomeExercicio}',
        series        =  ${novoExercicio.series},
        repeticoes    =  ${novoExercicio.repeticoes},
        tempoS        =  ${novoExercicio.tempo}

        WHERE idExercicio = ${idExercicio}`;
    
    
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

    router.delete('/delete/:idExercicio', (req: Request, res: Response) => {
        const idExercicio = req.params.idExercicio;
        const query = `SELECT * FROM Exercicio WHERE idExercicio = ${idExercicio}`;
    
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
    
            const query2 = `DELETE FROM Exercicio WHERE idExercicio = ${idExercicio}`;
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