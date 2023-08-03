import { Router, Request, Response } from 'express';
const db = require('./bd')

const router : Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    db.connect();
});

router.get('/connect', (req: Request, res: Response) => {
});

export const Routes : Router = router;