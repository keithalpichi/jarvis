import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const date = new Date(this.props.msg.createdAt)
    return (
      <div className="message">
        <div><span className="username">{this.props.msg.username}</span> - {this.props.msg.text}</div>
        <div className="time"> at {date.toDateString()}</div>
      </div>
    )
  }
}

export default Message;
