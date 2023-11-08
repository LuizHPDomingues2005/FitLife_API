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

// byId
router.get('/get/id/:idExercicio', (req: Request, res: Response) => {
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

// byIntensidade
router.get('/get/intensidade/:intensidade', (req: Request, res: Response) => {
    const intensidade = req.params.intensidade;
    const query = `SELECT * FROM Exercicio WHERE ciclo = ${intensidade}`;

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

// byCiclo
router.get('/get/ciclo/:ciclo', (req: Request, res: Response) => {
    const ciclo = req.params.ciclo;
    const query = `SELECT * FROM Exercicio WHERE ciclo = '${ciclo}'`;

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
        tempo        : req.body.tempo,
        intensidade  : req.body.intensidade,
        imageUrl     : req.body.imageUrl,
        ciclo        : req.body.ciclo,
        idMusculo    : req.body.idMusculo
    }

    const query =
        `INSERT INTO Exercicio 
        (nomeExercicio, series, repeticoes, tempoS, intensidade, imageUrl, ciclo, idMusculo)
        values 
        ('${novoExercicio.nomeExercicio}',
          ${novoExercicio.series},
          ${novoExercicio.repeticoes},
          ${novoExercicio.tempo},
          ${novoExercicio.intensidade},
          '${novoExercicio.imageUrl}',
          '${novoExercicio.ciclo}',
          ${novoExercicio.idMusculo})`

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
            tempo        : req.body.tempo,
            intensidade  : req.body.intensidade,
            imageUrl     : req.body.imageUrl,
            ciclo        : req.body.ciclo,
            idMusculo    : req.body.idMusculo
        }
    
    
        const query2 =
        `UPDATE Exercicio SET
        nomeExercicio = '${novoExercicio.nomeExercicio}',
        series        =  ${novoExercicio.series},
        repeticoes    =  ${novoExercicio.repeticoes},
        tempoS        =  ${novoExercicio.tempo},
        intensidade   =  ${novoExercicio.intensidade},
        imageUrl      =  '${novoExercicio.imageUrl}',
        ciclo         =  '${novoExercicio.ciclo}',
        idMusculo     =  ${novoExercicio.idMusculo}

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