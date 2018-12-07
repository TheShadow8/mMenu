const Notification = require('../models/Notification');

exports.socketManager = socket => {
  socket.on('get all notifications', user => {
    allNotifications(socket, user);
  });
};

const allNotifications = async (socket, user) => {
  const newNotifications = await Notification.find({user: user}).sort({date: 'desc'});
  socket.emit('all notifications', newNotifications);
};

exports.createNotification = async (socket, user, post, content, type) => {
  await new Notification({
    user,
    post,
    content,
    type,
  }).save();
  const newNotifications = await Notification.find({}).sort({date: 'desc'});
  socket.emit('all notifications', newNotifications);
};
