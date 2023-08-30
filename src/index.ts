// importamos as bibliotecas necessárias
import * as express from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors')

require('dotenv').config()

// criamos uma instancia de aplicativo express
const app: express.Application = express();

// necessários para suportar tipo json
app.use(bodyParser.json());
// necessário para url
app.use(bodyParser.urlencoded({ extended: false }));

// cors
app.use(cors())

//////////////////////////////////////////////////////////////////////

// rotas
app.use('/user', require('./routes/authUser.js'));
app.use('/infouser', require('./routes/userInfo.js'))
app.use('/planoAlimentacao', require('./routes/planoAlimentacao.js'))

//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});