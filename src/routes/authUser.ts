const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth')
const bd = require('../bd');
const bcrypt = require('bcrypt');

require('dotenv').config();
// Cadastro

router.post('/cadastro', (req: any, res: any) => {

    
    bcrypt.hash(req.body.senhaUsuario, 10, (err: any, hash: any) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }
        
        console.log(hash)


        const query = "INSERT INTO USUARIO(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) VALUES (DEFAULT, $1, $2, $3) RETURNING *";
        const values = [req.body.nomeUsuario, req.body.emailUsuario, hash];
    
        bd.query(query, values, (err: any, data:any) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
            
            const user = {
                id: data.rows[0].idusuario,
                username: data.rows[0].nomeusuario,
                email: data.rows[0].emailusuario
            }

            const tok = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            
            res.status(200).send({
                token: tok,
                user: user
            });
        })
    });
})

// login

router.post('/login', (req: any, res: any) => {
    const query = "SELECT * FROM Usuario WHERE emailUsuario = $1";
    const values = [req.body.emailUsuario];

    bd.query(query, values, (err: any, data: any) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        if (data.rowCount == 0){
            res.status(404).send('Not Found');
            return;
        }

        bcrypt.compare(req.body.senhaUsuario, data.rows[0].senhausuario, (err: any, same: any) => {
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
                id: data.rows[0].idusuario,
                username: data.rows[0].nomeusuario,
                email: data.rows[0].emailusuario
            }

            const tok = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);

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