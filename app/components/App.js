import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import { v4 } from 'uuid'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages : []
    }
    this.addMessage = this.addMessage.bind(this)
  }

  addMessage(msg) {
    const newMsg = {
      text: msg.text,
      username: msg.username,
      id: v4()
    }
    this.setState({
      messages: [
        ...this.state.messages,
        newMsg
      ]
    })
  }

  render() {
    return (
      <div>
        <h2>Chat with Jarvis</h2>
        <ChatContainer addMessage={this.addMessage} messages={this.state.messages} />
      </div>

    )
  }
}

export default App;
