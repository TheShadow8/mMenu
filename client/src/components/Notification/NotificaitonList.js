import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function NotificationList({socket, user, notifications, toggleNotifications}) {
  let content;

  const onClickNotification = notfId => {
    const notfData = {
      user,
      notfId,
    };
    socket.emit('is seen notification', notfData);
    toggleNotifications();
  };

  notifications.length === 0
    ? (content = <div className="notification__text">No Notification</div>)
    : (content = notifications.map((notification, i) => (
        <ul key={i}>
          <Link className=" post__link" to={`/post/${notification.post}`} onClick={() => onClickNotification(notification._id)}>
            {notification.content}
          </Link>
        </ul>
      )));

  return <div className=" notification__list">{content}</div>;
}

Notification.propTypes = {
  socket: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  toggleNotifications: PropTypes.func.isRequired,
};
export default NotificationList;
