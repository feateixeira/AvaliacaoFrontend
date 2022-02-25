const express = require('express');

const ClientesControllers = require('./controlles/ClientesControllers');
const UserControllers = require('./controlles/UserControllers');
const SessionControllers = require('./controlles/SessionController');
const { Router } = require('express');

const routes = express.Router();

//rota para autenticação de login
routes.post('/sessions', SessionControllers.create);

//rota para listagem de clientes da tabela
routes.get('/clientes', ClientesControllers.index);
//rota para cadastro de novos clientes
routes.post('/clientes', ClientesControllers.create);

//rota para listagem de usuarios
routes.get('/users', UserControllers.index);
routes.post('/users', UserControllers.create);


module.exports = routes;