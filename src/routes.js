const express = require('express')
const routes =express.Router()
const Logins = require('./controllers/controllerCads')
const Teste = require('./middlewares/testemiddlewares')
const authMiddleware = require('./middlewares/auth')

routes.get('/teste',authMiddleware,Teste.Teste)
routes.post("/cad",Logins.Register)
routes.post("/login",Logins.Login)
routes.get("/user",Logins.index)
routes.get('/user/:id',Logins.find);

module.exports = routes