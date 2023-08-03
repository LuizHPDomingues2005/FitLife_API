
// importamos as bibliotecas necessárias
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';

// criamos uma instancia de aplicativo express
const app: express.Application = express();

// necessários para suportar tipo json
app.use(bodyParser.json());
// necessário para url
app.use(bodyParser.urlencoded({ extended: false }));

// rotas
app.use('/api', Routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});