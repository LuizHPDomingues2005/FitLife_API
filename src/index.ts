// importamos as bibliotecas necessárias
import * as express from 'express';
import * as bodyParser from 'body-parser';

require('dotenv').config()

// criamos uma instancia de aplicativo express
const app: express.Application = express();

// necessários para suportar tipo json
app.use(bodyParser.json());
// necessário para url
app.use(bodyParser.urlencoded({ extended: false }));

// rotas
app.use('/user', require('./routes/authUser.js'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});