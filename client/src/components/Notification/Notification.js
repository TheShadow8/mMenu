import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import './Notification.css';
import NotificationList from './NotificaitonList';

// NOTE: Change when deploy

export class Notification extends Component {
  state = {
    socket: null,
    notifications: [],
    show: false,
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

  toggleNotifications = () => {
    this.setState({show: !this.state.show});
  };
  render() {
    const {notifications, show} = this.state;

    return (
      <div className="text-white notification">
        <li className="nav-item" onClick={this.toggleNotifications}>
          <a className="nav-link">
            <i className="far fa-heart fa-2x" />
            {notifications.length > 0 && notifications.length}
          </a>
        </li>
        {show && (
          <NotificationList
            socket={this.state.socket}
            user={this.props.user._id}
            notifications={notifications}
            toggleNotifications={this.toggleNotifications}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Notification);
