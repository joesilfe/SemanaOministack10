const { Router } = require('express')
const DevControllers = require('./controllers/DevControllers')
const SearchController = require('./controllers/SearchController')
const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: resquest.query (filtros, odenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)
routes.get('/devs', DevControllers.index)
routes.post('/devs', DevControllers.store)
routes.delete('/devs', DevControllers.destroy)
routes.get('/search', SearchController.index)

module.exports = routes