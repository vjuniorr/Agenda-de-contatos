require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { // Espera a conexão ser estabelecida
        app.emit('Pronto');
    }) // Criando a conexão com o banco de dados
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes'); 
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); // Pegando arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'frontend', 'assets', 'img')));

const sessionOptions = session({
    secret: 'mySecret',
    // store: new MongoStore({ mongooseConnection: mongoose.connection }), // Dando error
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }) 
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // setando o diretório das views
app.set('view engine', 'ejs'); // setando o motor de views - ejs

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal); // Usando o meu middleware para todas as rotas e requisições
app.use(checkCsrfError); // Usando o meu middleware para todas as rotas e requisições
app.use(csrfMiddleware); // Usando o meu middleware para todas as rotas e requisições
app.use(routes);

app.on('Pronto', () => { // Esperando a conexão ser estabelecida com o banco de dados
    app.listen(3000, () => { // Quando app emitir o evento 'Pronto' o servidor irá iniciar na porta 3000
        console.log('Acesse http://localhost:3000');
        console.log('Servidor rodando na porta 3000');
    });
});