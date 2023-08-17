const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth')
const bd = require('../bdconfig.js');
const bcrypt = require('bcrypt');
const jwtUser = require('jsonwebtoken');

require('dotenv').config();
// Cadastro

router.post('/cadastro', (req: any, res: any) => {

    bcrypt.hash(req.body.senhaUsuario, 10, (err: any, hash: any) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        
        const query = `INSERT INTO USUARIO(nomeUsuario, emailUsuario, senhaUsuario) VALUES ('${req.body.nomeUsuario}', '${req.body.emailUsuario}', '${hash}')`;

        bd.query(query, (err: any, data:any) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

        res.status(200).send("Created");
            
        })
    });
})




// login

router.post('/login', (req: any, res: any) => {
    const query = `SELECT * FROM Usuario WHERE emailUsuario = '${req.body.emailUsuario}'`;

    
    bd.query(query, (err: any, data: any) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (data.rowCount == 0){
            res.status(404).send('Not Found');
            return;
        }
        
        bcrypt.compare(req.body.senhaUsuario, data.recordset[0].senhaUsuario, (err: any, same: any) => {
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

router.post('/authorized', requireAuth, (req: any, res: any) => {
    res.status(200).send(res.locals.cookie);
})

module.exports = router;