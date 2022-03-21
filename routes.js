const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactController = require('./src/controllers/contactController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de registro
route.get('/register/index', registerController.index);
route.post('/register/register', registerController.register);

// Rotas de contatos
route.get('/contact/register', contactController.register);
route.post('/contact/save', contactController.save);
route.get('/contact/index/:id', contactController.index);
route.post('/contact/edit/:id', contactController.edit);

module.exports = route;