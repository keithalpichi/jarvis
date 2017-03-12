const routes = require('express').Router()
const messages = require('./messages')
const jarvis = require('./jarvis')

routes.use('/messages', messages)
routes.use('/jarvis', jarvis)
//routes.use('/users', users)

module.exports = routes
