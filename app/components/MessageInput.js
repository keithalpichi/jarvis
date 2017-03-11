import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props)
    this.handleChatSend = this.handleChatSend.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChatSend() {
    const message = {}
    message.text = this.refs.message.value
    message.username = 'Jarvis'
    this.props.addMessage(message)
    this.refs.message.value = ''
  }

  handleKeyPress(e) {
    if (e.which === 13) this.handleChatSend()
  }

  render() {
    return (
      <div id="MessageInput">
        <input id="message-input" ref="message" autoComplete="off" onKeyPress={this.handleKeyPress}/>
        <button onClick={this.handleChatSend}>Send</button>
      </div>
    )
  }
}

export default MessageInput;
