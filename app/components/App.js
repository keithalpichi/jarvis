import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import MessageInput from './MessageInput'
import MessageFeed from './MessageFeed'
import { httpGetAll, httpPost, getFromWolfram } from '../utils/requests'
import { parseString } from 'xml2js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username || 'Guest',
      messages : []
    }
    this.addMessage = this.addMessage.bind(this)
    this.pushMsgToState = this.pushMsgToState.bind(this)
    this.replaceMessages = this.replaceMessages.bind(this)
    this.emitMessage = this.emitMessage.bind(this)
  }

  componentWillMount() {
    httpGetAll('/messages')
    .then(this.replaceMessages)
    .catch(function (err) {
      console.log('Could not fetch messages. Error ' + err);
    })
    socket.on('message sent', (msg) => {
      this.setState({
        messages: [
          ...this.state.messages,
          msg
        ]
      })
    })
  }

  pushMsgToState(msg) {
    const here = this
    return new Promise(function(res, rej) {
      here.setState({
        messages: [
          ...here.state.messages,
          msg
        ]
      })
      res(msg)
    });
  }

  replaceMessages(messages) {
    this.setState({
      messages: messages
    })
  }

  addMessage(msg) {
    const jarvisRequest = this.parseMessageForQuery(msg.text)
    let newMsg = {}

    if (jarvisRequest) {
      const query = jarvisRequest[1]
      debugger
      const assistantMsg = {}
      newMsg.text = msg.text
      newMsg.username = msg.username || 'Guest'
      httpPost('/messages', newMsg)
        .then(this.pushMsgToState)
        .then(this.emitMessage)
        .catch(function (err) {
          console.log('Error: ', err);
        })

      getFromWolfram(query)
        .then(function (answer) {
          debugger
          assistantMsg.text = answer
          assistantMsg.username = 'Jarvis'
          return httpPost('/messages', assistantMsg)
        })
        .then(this.pushMsgToState)
        .then(this.emitMessage)
        .catch(function (err) {
          console.log('Error: ', err);
        })
    } else {
      newMsg = {
        text: msg.text,
        username: msg.username || 'Guest',
      }
      httpPost('/messages', newMsg)
        .then(this.pushMsgToState)
        .then(this.emitMessage)
        .catch(function (err) {
          console.log('Error: ', err);
        })
    }
  }

  emitMessage(msg) {
    const io = socket
    return new Promise(function(res, rej) {
      res(io.emit('message sent', msg))
    });
  }

  parseMessageForQuery(message) {
    return message.match(/\@Jarvis (.*)(?=\?)/)
  }

  render() {
    return (
      <div>
        <h2 id="header">Jarvis</h2>
        <MessageFeed messages={this.state.messages}/>
        <MessageInput addMessage={this.addMessage} changeUsername={this.changeUsername}/>
      </div>

    )
  }
}

export default App;
