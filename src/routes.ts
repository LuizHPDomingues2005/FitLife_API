import { Router, Request, Response } from 'express';
const bd = require('./bd')

const router : Router = Router();

router.get('/', (req: any, res: any) => {
    res.send('Hello World!');
    bd.connectar();
});


// USUARIO
router.use('/user', require('./routes/authUser.js'))


module.exports = router;