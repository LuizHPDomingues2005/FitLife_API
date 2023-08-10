import { Router, Request, Response } from 'express';
const bd = require('./bd')

const router : Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    bd.connectar();
});


// USUARIO
router.get('/usuario', (req: Request, res: Response) => {

})


export const Routes : Router = router;