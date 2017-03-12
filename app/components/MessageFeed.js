import React, { Component } from 'react';
import Message from './Message'

class MessageFeed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.messages.length === 0) return null
    return (
      <div id="MessageFeed">
        {this.props.messages.map((msg, i) => {
          return <Message msg={msg} key={msg._id || i} i={i}/>
        })}
      </div>
    )
  }
}

export default MessageFeed;
