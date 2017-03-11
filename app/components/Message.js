import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="message">
        <span className="username">{this.props.msg.username}</span>- <span>{this.props.msg.text}</span>
      </div>
    )
  }
}

export default Message;
