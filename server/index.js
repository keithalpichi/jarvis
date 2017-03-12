var path = require('path')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var bodyParser = require('body-parser')
var apiRoutes = require('./routes')
var cors = require('cors')
var appName = 'jarvis'

mongoose.connect(`mongodb://localhost/${appName}`)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the DB')
});

app.use(cors())
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../app/static')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use('/api', apiRoutes)

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 8080;

io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  })

  socket.on('message sent', function (msg) {
    console.log(`Message sent: ${msg.text} by ${msg.username}`)
    socket.broadcast.emit('message sent', msg)
  })
})

io.on('connect', function (socket) {
  socket.on('message', function (msg) {
    console.log('Message: ' + msg);
  })
})

server.listen(port, host, (err) => {
  if (err) {
    console.log('Error on server start: ', err);
  } else {
    console.log(`Running on host ${host} at port ${port}`)
  }
});

module.exports = app
