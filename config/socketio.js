const Notification = require('../models/Notification');

exports.socketManager = socket => {
  socket.on('get all notifications', user => {
    allNotifications(socket, user);
  });
  socket.on('is seen notification', async notfData => {
    await Notification.findOneAndUpdate({_id: notfData.notfId}, {$set: {isSeen: true}});

    allNotifications(socket, notfData.user);
  });
};

const allNotifications = async (socket, user) => {
  const newNotifications = await Notification.find({user, isSeen: false}).sort({date: 'desc'});
  socket.emit('all notifications', newNotifications);
};

exports.createNotification = async (socket, user, post, content, type) => {
  await new Notification({
    user,
    post,
    content,
    type,
  }).save();
  const newNotifications = await Notification.find({isSeen: false}).sort({date: 'desc'});
  socket.emit('all notifications', newNotifications);
};
