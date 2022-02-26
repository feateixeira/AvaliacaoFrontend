const express = require('express');

const ClientesControllers = require('./controlles/ClientesControllers');
const UserControllers = require('./controlles/UserControllers');
const SessionControllers = require('./controlles/SessionController');
const ProfileController = require('./controlles/ProfileControllers')


const routes = express.Router();


routes.post('/sessions', SessionControllers.create);

routes.get('/profile', ProfileController.index);


routes.get('/clientes', ClientesControllers.index);
routes.post('/clientes', ClientesControllers.create);
routes.delete('/clientes/:id', ClientesControllers.delete);


routes.get('/users', UserControllers.index);
routes.post('/users', UserControllers.create);


module.exports = routes;