import React, { Component } from 'react';
import Message from './Message'

class MessageFeed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="MessageFeed">
        {this.props.messages.map(msg => {
          return <Message msg={msg} key={msg.id}/>
        })}
      </div>
    )
  }
}

export default MessageFeed;
