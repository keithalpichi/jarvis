var path = require('path')
var express = require('express')
var app = express()
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var bodyParser = require('body-parser')
var appName = 'jarvis'

mongoose.connect(`mongodb://localhost/${appName}`)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the DB')
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../app/static')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 8080;

app.listen(port, host, (err) => {
  if (err) {
    console.log('Error on server start: ', err);
  } else {
    console.log(`Running on host ${host} at port ${port}`)
  }
});

module.exports = app
