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
    message.username = this.refs.username.value
    this.props.addMessage(message)
    this.refs.message.value = ''
  }

  handleKeyPress(e) {
    if (e.which === 13) this.handleChatSend()
  }

  render() {
    return (
      <div id="MessageInput">
        <div id="message-box" >
          <input id="message-username" ref="username" autoComplete="on" placeholder="Username"/>
          <input id="message-input" ref="message"
            autoComplete="off" onKeyPress={this.handleKeyPress}
            placeholder="Message friend or ask @Jarvis"
            size="40"
          />
        </div>
      </div>
    )
  }
}

export default MessageInput;
