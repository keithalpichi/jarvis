import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
  }

  evenEl() {
    return this.props.i % 2 === 0
  }

  render() {
    const date = new Date(this.props.msg.createdAt)
    return (
      <div className={this.evenEl() ? "message leftBubble" : "message rightBubble"}>
        <div><span className="username">{this.props.msg.username}</span> - {this.props.msg.text}</div>
        <div className="time"> at {date.toDateString()}</div>
      </div>
    )
  }
}

export default Message;
