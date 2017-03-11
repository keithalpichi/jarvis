import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import { httpGetAll, httpPost } from '../utils/requests'

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
    const newMsg = {
      text: msg.text,
      username: msg.username || 'Guest',
    }
    httpPost('/messages', newMsg)
      .then(this.pushMsgToState)
    socket.emit('message sent', newMsg)
  }

  render() {
    return (
      <div>
        <h2 id="header">Jarvis</h2>
        <ChatContainer addMessage={this.addMessage} messages={this.state.messages} />
      </div>

    )
  }
}

export default App;
