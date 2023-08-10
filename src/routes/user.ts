const router = require('express').Router();
const bd = require('../bd');

// getAll
router.get('/', (req: any,res: any) => {
    const query = 'SELECT * FROM usuario';

    bd.query(query, (err: any, data: any) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.recordsets == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.recordsets);
    });
})

// getUser
router.get('/:idusuario', (req: any,res: any) => {

    const query = "SELECT * FROM usuario WHERE idUsuario = $1";

    const value = [req.params.idusuario];

    console.log(value)

    bd.query(query, value, (err: any, data: any) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.recordsets == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.recordsets);
    });
})

module.exports = router;