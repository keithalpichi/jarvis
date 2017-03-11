const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  //_user: { type: Number, ref: 'User', required: 'Message must have a user' }
  //_room: { type: Number, ref: 'Room', required: 'Message must have a room' }
  username: { type: String, required: 'Username is required' },
  text: { type: String, required: 'Text is required' },
  createdAt: {type: Date, required: true, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
