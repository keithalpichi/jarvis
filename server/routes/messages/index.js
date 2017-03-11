const messages = require('express').Router()
const Message = require('../../models/message')

// Get a single message
messages.get('/:id', function (req, res) {
  Message.findById({_id: req.body.id})
    .exec(function (err, message) {
      if (message) {
        res.status(200).json(message)
      } else {
        res.status(404).json(err)
      }
    })

})

// Get all messages
messages.get('/', function (req, res) {
  Message.find({}).sort({ createdAt: 'asc' })
    .exec(function (err, messages) {
      if (messages) {
        res.status(200).json(messages)
      } else {
        res.status(404).json(err)
      }
    })

})

// Post a single message
messages.post('/', function (req, res) {
  console.log(req.body);
  const newMsg = new Message({
    text: req.body.text,
    username: req.body.username
  })

  newMsg.save(function (err) {
    if (err) {
      res.status(500).json(err.errors)
    } else {
      res.status(201).json(newMsg)
    }
  })
})


module.exports = messages
