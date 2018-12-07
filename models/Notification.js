const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    requied: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = notification = mongoose.model('notification', NotificationSchema);
