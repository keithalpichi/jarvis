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
    this.setState({
      messages: [
        ...this.state.messages,
        msg
      ]
    })
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
        .catch(function (err) {
          console.log('Error: ', err);
          // assistantMsg.text = 'Master, I failed to answer your inquiry. Can you be a bit more specific?'
          // assistantMsg.username = 'Jarvis'
          // httpPost('/messages', assistantMsg)
          //   .then(this.pushMsgToState)
        })
    } else {
      newMsg = {
        text: msg.text,
        username: msg.username || 'Guest',
      }
      httpPost('/messages', newMsg)
        .then(this.pushMsgToState)
        .catch(function (err) {
          console.log('Error: ', err);
        })
    }
    socket.emit('message sent', newMsg)
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
