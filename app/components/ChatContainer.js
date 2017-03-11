import React, { Component } from 'react'
import MessageInput from './MessageInput'
import MessageFeed  from './MessageFeed'

class ChatContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="ChatContainer">
        <MessageInput addMessage={this.props.addMessage}/>
        <MessageFeed messages={this.props.messages}/>
      </div>
    )
  }
}

export default ChatContainer;
