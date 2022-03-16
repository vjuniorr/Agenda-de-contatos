/**
 * Route irá ver qual é a rota que está sendo acessada e irá chamar o controller correspondente
*/

const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// function meuMiddleware(req, res, next) { // Se usar o next, temos que chamar o next()
//     console.log();
//     console.log('Executando meu middleware');
//     console.log();
//     next(); // Chama o próximo middleware que está sendo chamado
// }

// Rotas da pagina inicial
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

// Rotas de contato
route.get('/contato', contatoController.paginaInicial)

module.exports = route;