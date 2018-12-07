import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

// NOTE: Change when deploy

export class Notification extends Component {
  state = {
    socket: null,
    notifications: [],
  };

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    this.state.socket.emit('get all notifications', this.props.user._id);
    this.state.socket.on('all notifications', notifications => {
      const filtedNotification = notifications.filter(notification => notification.user === this.props.user._id);
      this.setState({notifications: filtedNotification});
    });
  }
  initSocket = () => {
    const socket = io.connect('http://localhost:5000');
    this.setState({socket});
  };

  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  render() {
    const {notifications} = this.state;
    let content;

    notifications.length === 0
      ? (content = null)
      : (content = notifications.map((notification, i) => (
          <ul key={i} className="text-white">
            <li>
              {notification.content} {notification.type}
            </li>
          </ul>
        )));

    return <div className="text-white"> {content} </div>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Notification);
