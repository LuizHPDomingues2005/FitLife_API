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


// USUARIO
app.use('/user',                require('./routes/user.js'));
app.use('/infouser',            require('./routes/userInfo.js'));

// ALIMENTACAO
app.use('/ingrediente',         require('./routes/ingrediente.js'));
app.use('/cardapio',            require('./routes/cardapio.js'));
app.use('/cardapioIngrediente', require('./routes/cardapioIngrediente.js'));
app.use('/alimentacaoCardapio', require('./routes/alimentacaoCardapio.js'));
app.use('/planoAlimentacao',    require('./routes/planoAlimentacao.js'));
app.use('/usuarioAlimentacao',  require('./routes/usuarioAlimentacao.js'));

// TREINO
app.use('/musculo',             require('./routes/musculo.js'));
app.use('/exercicio',           require('./routes/exercicio.js'));
app.use('/treinoExercicio',     require('./routes/treinoExercicio.js'));
app.use('/planoTreino',         require('./routes/planoTreino.js'));
app.use('/usuarioTreino',       require('./routes/usuarioTreino.js'));





//////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API aberta em http://localhost:${port}/`);
});