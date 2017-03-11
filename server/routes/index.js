const routes = require('express').Router()
const messages = require('./messages')

routes.use('/messages', messages)
//routes.use('/users', users)

module.exports = routes
